import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaStar,
  FaCode,
  FaUsers,
  FaGithub,
  FaSearch,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Theme context
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const GITHUB_REPO = "Roshansuthar1105/Codify";
const token = import.meta.env.VITE_GITHUB_TOKEN;

// Points configuration for different PR levels
const POINTS = {
  "level 1": 3, // Easy
  "level 2": 7, // Medium
  "level 3": 10, // Hard/Feature
};

// Badge component for PR counts
const Badge = ({ count, label, color }) => (
  <div
    className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${color} bg-opacity-20`}
  >
    <FaCode className="mr-1 sm:mr-1.5 text-xs" />
    <span>
      {count} {label}
    </span>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader = ({ isDark }) => (
  <div
    className={`${
      isDark
        ? "bg-dark-bg-primary border-dark-border"
        : "bg-white border-gray-100"
    } rounded-xl shadow-sm border overflow-hidden`}
  >
    <div
      className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${
        isDark
          ? "bg-dark-bg-secondary border-dark-border"
          : "bg-gray-50 border-gray-100"
      } border-b`}
    >
      <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        #
      </div>
      <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
        Contributor
      </div>
      <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
        Contributions
      </div>
    </div>
    <div className="divide-y divide-gray-100 dark:divide-dark-border">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center sm:px-6 sm:py-4"
        >
          <div className="flex items-center space-x-3 sm:hidden">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-bg-tertiary animate-pulse flex-shrink-0"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-bg-tertiary animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="w-24 h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-12 h-6 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full animate-pulse"></div>
                <div className="w-12 h-6 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:contents">
            <div className="col-span-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-bg-tertiary animate-pulse"></div>
            </div>
            <div className="col-span-6 md:col-span-7">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-bg-tertiary animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-dark-bg-tertiary rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-dark-bg-tertiary rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="col-span-5 md:col-span-4">
              <div className="flex items-center justify-end space-x-3">
                <div className="w-16 h-8 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 dark:bg-dark-bg-tertiary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPRs: 0,
    totalContributors: 0,
    totalPoints: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: false }); // trigger every time visible

  useEffect(() => {
    const fetchContributorsWithPoints = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        const MAX_PAGES = 10;
        let keepFetching = true;

        while (keepFetching && page <= MAX_PAGES) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );
          const prs = await res.json();

          if (
            !Array.isArray(prs) ||
            prs.length === 0 ||
            (prs.length === 1 && prs[0].message)
          ) {
            keepFetching = false;
            break;
          }

          prs.forEach((pr) => {
            if (!pr.merged_at) return;
            const labels = pr.labels.map((l) => l.name.toLowerCase());
            if (!labels.includes("gssoc25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label) => {
              if (POINTS[label]) points += POINTS[label];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }

            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page += 1;
        }

        // Sort by points (or by PRs if that's your criteria)
        const contributorsArray = Object.values(contributorsMap);
        const sorted = contributorsArray.sort(
          (a, b) => b.points - a.points
        );
        // assign rank -> ranks will same on searching 
        const rankedContributers = sorted.map(
          (c, index) => ({
            ...c ,
            rank : index + 1, //store real rank
          })
        );

        setContributors(rankedContributers);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  useEffect(() => {
    if (contributors.length > 0) {
      const totalPRs = contributors.reduce((sum, c) => sum + Number(c.prs), 0);
      const totalPoints = contributors.reduce(
        (sum, c) => sum + Number(c.points),
        0
      );

      const flooredTotalPRs = Math.floor(totalPRs / 10) * 10;
      const flooredTotalPoints = Math.floor(totalPoints / 10) * 10;
      const flooredContributorsCount =
        Math.floor(contributors.length / 10) * 10;

      setStats({
        flooredTotalPRs,
        totalContributors: flooredContributorsCount,
        flooredTotalPoints,
      });
    }
  }, [contributors]);

  // Filter contributors by search term (username)
  const filteredContributors = contributors.filter((c) =>
    c.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination variables and states
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate which contributors to show on current page
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentContributors = filteredContributors.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredContributors.length / PAGE_SIZE);

  // Gradient backgrounds from Footer.jsx theme
  const gradientBg = isDark
    ? "bg-gradient-to-br from-dark-bg-primary to-dark-bg-secondary"
    : "bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl";

  const cardBg = isDark
    ? "bg-dark-bg-tertiary border-dark-border"
    : "bg-light-bg-tertiary border-light-border";

  return (
    <div
      className={`${
        isDark ? "bg-dark-bg-primary" : "bg-gray-50"
      } min-h-screen py-6 sm:py-12 px-2 sm:px-4 relative overflow-hidden z-10`}
    >
      {/* enhance background with grid pattern */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            ref={ref}
            className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-primary-600`}
          >
            {/* GSSoC'25 Leaderboard */}
            <span className="inline-block mr-2">
              {"GSSoC'25 LeaderBoard ".split("").map((char, i) => (
                <span
                  key={`Welcome-${i}`}
                  className={`inline-block opacity-0 ${
                    inView ? "animate-fadeIn" : ""
                  }
                `}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
          <p
            className={`text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          >
            Celebrating the amazing contributions from GSSoC'25 participants.
            Join us in building something incredible together!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 px-2`}
        >
          <div
            className={`p-4 sm:p-6 rounded-xl shadow-sm border ${gradientBg} ${
              isDark ? "border-dark-border" : "border-light-border"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-lg ${
                  isDark
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                } mr-3 sm:mr-4 flex-shrink-0`}
              >
                <FaUsers className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs sm:text-sm ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Contributors
                </p>
                <p
                  className={`text-lg sm:text-2xl font-bold ${
                    isDark
                      ? "text-dark-text-primary"
                      : "text-light-text-primary"
                  }`}
                >
                  {loading ? "..." : stats.totalContributors}+
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-xl shadow-sm border ${gradientBg} ${
              isDark ? "border-dark-border" : "border-light-border"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-lg ${
                  isDark
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-600"
                } mr-3 sm:mr-4 flex-shrink-0`}
              >
                <FaCode className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs sm:text-sm ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Pull Requests
                </p>
                <p
                  className={`text-lg sm:text-2xl font-bold ${
                    isDark
                      ? "text-dark-text-primary"
                      : "text-light-text-primary"
                  }`}
                >
                  {loading ? "..." : stats.flooredTotalPRs}+
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 sm:p-6 rounded-xl shadow-sm border ${gradientBg} ${
              isDark ? "border-dark-border" : "border-light-border"
            } sm:col-span-2 md:col-span-1`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 sm:p-3 rounded-lg ${
                  isDark
                    ? "bg-purple-900/30 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                } mr-3 sm:mr-4 flex-shrink-0`}
              >
                <FaStar className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs sm:text-sm ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Total Points
                </p>
                <p
                  className={`text-lg sm:text-2xl font-bold ${
                    isDark
                      ? "text-dark-text-primary"
                      : "text-light-text-primary"
                  }`}
                >
                  {loading ? "..." : stats.flooredTotalPoints}+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* contributer guid */}
        <div
          onClick={() => navigate("/contributorGuide")}
          className={`flex items-center justify-center flex-col mb-8 sm:mb-12 px-2 py-10 rounded-xl shadow-sm border ${gradientBg} ${
            isDark ? "border-dark-border" : "border-light-border"
          }`}
        >
          <div>
            <FaBookOpen className="h-8 w-8" />
          </div>
          <div className="text-2xl">Contributor Guide</div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6 px-2">
          <div className={`relative w-full max-w-xs`}>
            <input
              type="text"
              placeholder="Search contributor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-6 py-4 rounded-lg border focus:outline-none transition-colors placeholder:text-lg ${
                isDark
                  ? "bg-dark-bg-secondary border-dark-border text-dark-text-primary placeholder:text-dark-text-secondary"
                  : "bg-white border-light-border text-light-text-primary placeholder:text-light-text-secondary"
              }`}
            />
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            />
          </div>
        </div>

        {loading ? (
          <SkeletonLoader isDark={isDark} />
        ) : (
          <div
            className={`rounded-xl shadow-sm border overflow-hidden mx-2 sm:mx-0 ${gradientBg} ${
              isDark ? "border-dark-border" : "border-light-border"
            }`}
          >
            {/* Desktop Table Header - Hidden on mobile */}
            <div
              className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${
                isDark
                  ? "bg-dark-bg-secondary border-dark-border"
                  : "bg-gray-50 border-light-border"
              } border-b`}
            >
              <div className="col-span-1 text-sm font-medium text-dark-text-secondary">
                #
              </div>
              <div className="col-span-6 md:col-span-7 text-sm font-medium text-dark-text-secondary">
                Contributor
              </div>
              <div className="col-span-5 md:col-span-4 text-sm font-medium text-dark-text-secondary text-right">
                Contributions
              </div>
            </div>

            {/* Contributors List */}
            <div className="divide-y divide-gray-100 dark:divide-dark-border">
              {currentContributors.length === 0 ? (
                <div className="text-center py-8 text-dark-text-secondary">
                  No contributors found.
                </div>
              ) : (
                currentContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`group ${
                      isDark
                        ? "hover:bg-dark-bg-secondary"
                        : "hover:bg-light-bg-secondary"
                    } transition-colors`}
                  >
                    {/* Mobile Layout */}
                    <div className="sm:hidden p-4">
                      <div className="flex items-center space-x-3">
                        {/* Rank Badge */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                            index === 0 && currentPage == 1
                              ? isDark
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-yellow-100 text-yellow-600"
                              : index === 1 && currentPage == 1
                              ? isDark
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                              : index === 2 && currentPage == 1
                              ? isDark
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-amber-100 text-amber-600"
                              : isDark
                              ? "bg-dark-bg-tertiary text-dark-text-secondary"
                              : "bg-light-bg-tertiary text-light-text-secondary"
                          }`}
                        >
                          {/* rendering the rank on search also */}
                          {contributor.rank}
                        </div>

                        {/* Avatar */}
                        <img
                          src={contributor.avatar}
                          alt={contributor.username}
                          className={`w-10 h-10 rounded-full border-2 ${
                            isDark ? "border-dark-border" : "border-white"
                          } shadow-sm flex-shrink-0`}
                        />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <a
                                href={contributor.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-medium ${
                                  isDark
                                    ? "text-dark-text-primary hover:text-blue-400"
                                    : "text-light-text-primary hover:text-primary"
                                } transition-colors text-sm truncate block`}
                              >
                                {contributor.username}
                              </a>
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${
                                  isDark
                                    ? "text-dark-text-secondary hover:text-blue-400"
                                    : "text-light-text-secondary hover:text-primary"
                                } transition-colors block`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge
                              count={contributor.prs}
                              label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                              color={
                                isDark
                                  ? "bg-blue-900/30 text-blue-400"
                                  : "bg-blue-100 text-blue-700"
                              }
                            />
                            <Badge
                              count={contributor.points}
                              label="Points"
                              color={
                                isDark
                                  ? "bg-purple-900/30 text-purple-400"
                                  : "bg-purple-100 text-purple-700"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - Hidden on mobile */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 items-center px-6 py-4">
                      <div className="col-span-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 && currentPage == 1
                              ? isDark
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-yellow-100 text-yellow-600"
                              : index === 1 && currentPage == 1
                              ? isDark
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                              : index === 2 && currentPage == 1
                              ? isDark
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-amber-100 text-amber-600"
                              : isDark
                              ? "bg-dark-bg-tertiary text-dark-text-secondary"
                              : "bg-light-bg-tertiary text-light-text-secondary"
                          }`}
                        >
                          <span className="font-medium">
                            {/* rendering the rank on search also */}
                            {contributor.rank}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-7">
                        <div className="flex items-center space-x-4">
                          <img
                            src={contributor.avatar}
                            alt={contributor.username}
                            className={`w-10 h-10 rounded-full border-2 ${
                              isDark ? "border-dark-border" : "border-white"
                            } shadow-sm`}
                          />
                          <div>
                            <a
                              href={contributor.profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium ${
                                isDark
                                  ? "text-dark-text-primary hover:text-blue-400"
                                  : "text-light-text-primary hover:text-primary"
                              } transition-colors`}
                            >
                              {contributor.username}
                            </a>
                            <div className="flex items-center mt-1 space-x-2">
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${
                                  isDark
                                    ? "text-dark-text-secondary hover:text-blue-400"
                                    : "text-light-text-secondary hover:text-primary"
                                } transition-colors`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-5 md:col-span-4">
                        <div className="flex items-center justify-end space-x-3">
                          <Badge
                            count={contributor.prs}
                            label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                            color={
                              isDark
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-blue-100 text-blue-700"
                            }
                          />
                          <Badge
                            count={contributor.points}
                            label="Points"
                            color={
                              isDark
                                ? "bg-purple-900/30 text-purple-400"
                                : "bg-purple-100 text-purple-700"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div
              className={`flex justify-center items-center gap-2 py-4 border-t ${
                isDark ? "border-dark-border" : "border-light-border"
              }`}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 rounded-md ${cardBg} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex justify-center gap-2 mt-4">
                {Array.from(
                  {
                    length: Math.ceil(filteredContributors.length / PAGE_SIZE),
                  },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? isDark
                            ? "bg-blue-500 text-white"
                            : "bg-primary text-white"
                          : cardBg
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 rounded-md ${cardBg} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* CTA Footer */}
            <div className={`px-4 sm:px-6 py-4 text-center border-t ${cardBg}`}>
              <p
                className={`text-xs sm:text-sm ${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } mb-3`}
              >
                Want to see your name here? Join GSSoC'25 and start
                contributing!
              </p>
              <a
                href="https://gssoc.girlscript.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 sm:px-4 py-2 ${
                  isDark
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-primary hover:bg-primary-dark"
                } text-white text-xs sm:text-sm font-medium rounded-lg transition-colors`}
              >
                <FaGithub className="mr-1.5 sm:mr-2" /> Join GSSoC'25
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
