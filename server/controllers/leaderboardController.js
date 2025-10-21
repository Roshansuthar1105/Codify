import fetch from "node-fetch";
import { Contributor, Cache } from "../models/Contributor.js";

const GITHUB_URL = "https://api.github.com/repos/Roshansuthar1105/Codify";
const CACHE_KEY = "leaderboard";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const fetchFromGitHub = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      // Authorization: `token ${process.env.GITHUB_TOKEN}`, // optional
    },
  });
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};

export const fetchLeaderboard = async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === "true";
    const cache = await Cache.findOne({ key: CACHE_KEY });
    const now = Date.now();

    // ✅ Serve from cache if valid and no force refresh
    if (
      cache &&
      !forceRefresh &&
      now - cache.lastUpdated.getTime() < CACHE_TTL
    ) {
      return res.json({ success: true, data: cache.data });
    }

    // ✅ Fetch contributors and PRs from GitHub
    const [contributorsData, prsData] = await Promise.all([
      fetchFromGitHub(`${GITHUB_URL}/contributors`),
      fetchFromGitHub(`${GITHUB_URL}/pulls?state=all&per_page=100`),
    ]);

    // ✅ Calculate PR counts per user
    const prCounts = prsData.reduce((acc, pr) => {
      const user = pr.user?.login;
      if (user) acc[user] = (acc[user] || 0) + 1;
      return acc;
    }, {});

    // ✅ Construct leaderboard
    let leaderboard = contributorsData.map((c) => {
      const prs = prCounts[c.login] || 0;
      const points = prs * 10 + c.contributions;
      return {
        username: c.login,
        prs,
        contributions: c.contributions,
        avatar: c.avatar_url,
        points,
        profileUrl: c.html_url || `https://github.com/${c.login}`,
      };
    });

    // ✅ Sort leaderboard and add progress percentage
    leaderboard.sort((a, b) => b.points - a.points);
    const maxPoints = leaderboard[0]?.points || 1;
    leaderboard = leaderboard.map((user) => ({
      ...user,
      progress: Math.round((user.points / maxPoints) * 100),
    }));

    // ✅ Update database
    await Contributor.deleteMany({});
    await Contributor.insertMany(leaderboard);

    await Cache.findOneAndUpdate(
      { key: CACHE_KEY },
      { key: CACHE_KEY, data: leaderboard, lastUpdated: new Date() },
      { upsert: true }
    );

    return res.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error("❌ Error in fetchLeaderboard:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch leaderboard",
    });
  }
};
