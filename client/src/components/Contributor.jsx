import React, { useState, useEffect } from 'react';
import { Users, GitPullRequest, Activity, Star, Loader2, AlertCircle, PlusCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Adjust import path as needed
import { useAuth } from '../store/auth';

const ContributorsPage = () => {
    
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('points');
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const API = import.meta.env.VITE_SERVER_API;
  console.log(API);
  const API_ENDPOINT = `${API}/api/v1/leaderboard`;

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setContributors(data.data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedContributors = [...contributors].sort((a, b) => {
    switch(sortBy) {
      case 'points': return b.points - a.points;
      case 'prs': return b.prs - a.prs;
      case 'contributions': return b.contributions - a.contributions;
      case 'username': return a.username.localeCompare(b.username);
      default: return b.points - a.points;
    }
  });

  const getRankBadge = (index) => {
    if (index === 0) return (
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        1
      </div>
    );
    if (index === 1) return (
      <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
        2
      </div>
    );
    if (index === 2) return (
      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        3
      </div>
    );
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'
      }`}>
        {index + 1}
      </div>
    );
  };

  // Stats
  const totalContributors = contributors.length;
  const totalPRs = contributors.reduce((sum, c) => sum + c.prs, 0);
  const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0);
  const totalPoints = contributors.reduce((sum, c) => sum + c.points, 0);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
      }`}>
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
      }`}>
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className={`text-xl font-bold mb-2 ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Failed to Load Contributors
          </h2>
          <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {error}
          </p>
          <button 
            onClick={fetchContributors}
            className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}>
      {/* Header Section */}
      <div className="py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">
          GSSoC'25 Leaderboard
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${
          isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          Celebrating the amazing contributions from GSSoC'25 participants.
        </p>
      </div>

      {/* Stats Section */}
      <div className="px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={Users} value={`${totalContributors}+`} label="Contributors" isDark={isDark} />
            <StatCard icon={GitPullRequest} value={`${totalPRs}+`} label="Pull Requests" isDark={isDark} />
            <StatCard icon={PlusCircle} value={`${totalContributions}+`} label="Contributions" isDark={isDark} />
            <StatCard icon={Star} value={`${totalPoints}+`} label="Total Points" isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className={`rounded-xl overflow-hidden border ${
            isDark 
              ? 'bg-dark-bg-secondary border-dark-border' 
              : 'bg-light-bg-secondary border-light-border'
          }`}>
            {/* Table Header */}
            <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                <div className={`col-span-1 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>#</div>
                <div className={`col-span-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Contributor</div>
                <div className={`col-span-2 text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>PRs</div>
                <div className={`col-span-2 text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Contributions</div>
                
                <div className={`col-span-2 text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Progress</div>
              </div>
            </div>

            {/* Contributors List */}
            <div className={`divide-y ${isDark ? 'divide-dark-border' : 'divide-light-border'}`}>
              {sortedContributors.map((contributor, index) => (
                <div key={contributor.username} className={`p-4 transition-colors ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'}`}>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 flex justify-center">
                      {getRankBadge(index)}
                    </div>

                    {/* Contributor Info */}
                    <div className="col-span-4 flex items-center space-x-3">
                      <a href={contributor.profileUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={contributor.avatar}
                          alt={contributor.username}
                          className="w-10 h-10 rounded-full ring-2 ring-primary/50"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${contributor.username}&background=6366f1&color=ffffff`;
                          }}
                        />
                      </a>
                      <div>
                        <a 
                          href={contributor.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`font-medium hover:underline ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                        >
                          {contributor.username}
                        </a>
                        <div className={`text-xs hover:underline ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                          <a href={contributor.profileUrl} target="_blank" rel="noopener noreferrer">
                            View Contributions →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* PRs */}
                    <div className="col-span-2 text-center">
                      <div className="text-primary font-semibold">{contributor.prs}</div>
                    </div>

                    {/* Contributions */}
                    <div className="col-span-2 text-center">
                      <div className="text-primary font-semibold">{contributor.contributions}</div>
                    </div>

                    {/* Points */}
                     
                    {/* Progress */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <div className={`flex-1 rounded-full h-2 overflow-hidden ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
                          <div
                            className="bg-primary h-full transition-all duration-1000 rounded-full"
                            style={{ width: `${Math.min(contributor.progress, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs w-10 text-right ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                          {contributor.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="text-center mt-8">
            <button
              onClick={fetchContributors}
              className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Refresh Leaderboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, isDark }) => (
  <div className={`p-6 rounded-xl text-center border ${
    isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'
  }`}>
    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
    <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
      {value}
    </div>
    <div className="text-primary text-sm">{label}</div>
  </div>
);

export default ContributorsPage;
