import fetch from "node-fetch";
import { Contributor, Cache } from "../models/contributor.js";

const GITHUB_URL = "https://api.github.com/repos/Roshansuthar1105/Codify";
const CACHE_KEY = "leaderboard";
const CACHE_TTL = 30 * 60 * 1000; // 30 mins

async function fetchFromGitHub(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      // Authorization: `token ${process.env.GITHUB_TOKEN}`, // optional
    },
  });
  return res.json();
}

export const fetchLeaderboard = async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === "true";
    const cache = await Cache.findOne({ key: CACHE_KEY });
    const now = Date.now();

    // ✅ Serve from cache if still valid
    if (cache && !forceRefresh && now - cache.lastUpdated.getTime() < CACHE_TTL) {
      return res.json({ success: true, data: cache.data });
    }

    // ✅ Fetch contributors & PRs from GitHub
    const contributorsData = await fetchFromGitHub(`${GITHUB_URL}/contributors`);
    const prsData = await fetchFromGitHub(`${GITHUB_URL}/pulls?state=all&per_page=100`);

    // ✅ Count PRs per user
    const prCounts = {};
    prsData.forEach(pr => {
      if (pr.user?.login) {
        prCounts[pr.user.login] = (prCounts[pr.user.login] || 0) + 1;
      }
    });

    // ✅ Build leaderboard

    let leaderboard = contributorsData.map(c => {
      const prs = prCounts[c.login] || 0;
      const points = prs * 10 + c.contributions;
      return {
        username: c.login,
        prs,
        contributions: c.contributions,
        avatar: c.avatar_url,
        points,
        profileUrl: c.html_url || `https://github.com/${c.login}`, // ✅ Add profile link
      };
    });
    console.log(leaderboard)

    // Sort & add progress bar %
    leaderboard.sort((a, b) => b.points - a.points);
    const maxPoints = leaderboard[0]?.points || 1;
    leaderboard = leaderboard.map(c => ({
      ...c,
      progress: Math.round((c.points / maxPoints) * 100),
    }));

    // ✅ Save to DB
    await Contributor.deleteMany({});
    await Contributor.insertMany(leaderboard);

    await Cache.findOneAndUpdate(
      { key: CACHE_KEY },
      { key: CACHE_KEY, data: leaderboard, lastUpdated: new Date() },
      { upsert: true }
    );

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    console.error("❌ Error in fetchLeaderboard:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch leaderboard" });
  }
};
