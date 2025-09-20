import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../store/auth';
import InBrowserIDE from '../components/InBrowserIDE';
import { 
  Code2, 
  Sparkles, 
  BookOpen, 
  Users, 
  Zap,
  ArrowLeft,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IDE = () => {
  const { isDark } = useTheme();
  const { isLoggedIn, userdata } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide welcome message after 5 seconds or if user has used IDE before
    const hasUsedIDE = localStorage.getItem('codify-ide-visited');
    if (hasUsedIDE) {
      setShowWelcome(false);
    } else {
      localStorage.setItem('codify-ide-visited', 'true');
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-gray-700 bg-dark-bg-secondary' : 'border-gray-200 bg-light-bg-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 ${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'}`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Codify</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold">Codify IDE</h1>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Sparkles className="h-3 w-3 text-white" />
                  <span className="text-xs text-white font-medium">AI Powered</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}>
                    <span className="text-sm font-medium">
                      {userdata.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{userdata.username}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      {showWelcome && (
        <div className={`border-b ${isDark ? 'border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Welcome to Codify IDE!</h3>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Start coding with AI-powered autocomplete, multi-language support, and real-time execution.
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-xs text-green-600">
                      <Zap className="h-3 w-3" />
                      <span>Real-time execution</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-blue-600">
                      <Sparkles className="h-3 w-3" />
                      <span>AI autocomplete</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-purple-600">
                      <Code2 className="h-3 w-3" />
                      <span>Multi-language</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className={`text-sm ${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'}`}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main IDE Container */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-[calc(100vh-140px)]">
            <InBrowserIDE 
              initialLanguage="javascript"
              height="100%"
            />
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className={`border-t ${isDark ? 'border-gray-700 bg-dark-bg-secondary' : 'border-gray-200 bg-light-bg-secondary'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Info className="h-3 w-3" />
                <span>Press Ctrl+Space for AI suggestions</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3 text-green-500" />
                <span>JavaScript runs in browser sandbox</span>
              </div>
              <div className="flex items-center space-x-1">
                <Code2 className="h-3 w-3 text-blue-500" />
                <span>Other languages use secure backend execution</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <Link 
                to="/courses" 
                className="flex items-center space-x-1 hover:text-primary"
              >
                <BookOpen className="h-3 w-3" />
                <span>Learn with Courses</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-1 hover:text-primary"
              >
                <Users className="h-3 w-3" />
                <span>Community</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDE;
