import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

const CreatorsContainer = ({ count = 3 }) => {
  const { coursesData } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [creators, setCreators] = useState([]);

  // Creator data with CORRECT YouTube channel profile images
  const creatorInfo = [
    {
      name: "CodeWithHarry",
      channelId: "UCeVMnSShP_Iviwkknt83cww",
      youtubeLink: "https://www.youtube.com/@CodeWithHarry",
      description: "Learn coding with Harry",
      // Correct YouTube channel profile image from user
      fallbackImage: "https://yt3.googleusercontent.com/ytc/AIdro_kX3sdbuu3KFmRPsmlu0R5Rx_BhpxwupjtvJmkEdNfla7w=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Apna College",
      channelId: "UCBwmMxybNva6P_5VmxjzwqA",
      youtubeLink: "https://www.youtube.com/@ApnaCollegeOfficial",
      description: "Quality education for everyone",
      // Correct YouTube channel profile image from user
      fallbackImage: "https://yt3.googleusercontent.com/FEcjRtez5od8UowDo6tTt9WlE-MrIFEmcwPMTORmK9Swk6KCklOmA3xfIG9WuLWfNYfNThQE=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "CodeHelp - by Babbar",
      channelId: "UCbWZFD-vbGYHkyz4cdyfldQ",
      youtubeLink: "https://www.youtube.com/@CodeHelp",
      description: "Master DSA with Babbar",
      // Correct YouTube channel profile image from user
      fallbackImage: "https://yt3.googleusercontent.com/st0tjHROqHEs6scfJ0ZVyMPP1_bh18WJ7l4zAjR4yRf-9sX-eFz2heChzXkiF2TL2tyo2fj_mg=s160-c-k-c0x00ffffff-no-rj"
    }
  ];

  // Set creators directly with correct images
  useEffect(() => {
    setCreators(creatorInfo);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {/* Loading state */}
      {creators.length === 0 && (
        <>
          {[1, 2, 3].map((index) => (
            <div
              key={`loading-${index}`}
              className={`
                flex flex-col items-center p-6 rounded-2xl border shadow-lg
                ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
              `}
            >
              {/* Loading skeleton for profile picture */}
              <div className="relative mb-4 w-24 h-24 rounded-full border-4 border-primary bg-gray-300 animate-pulse"></div>
              
              {/* Loading skeleton for name */}
              <div className="w-24 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
              
              {/* Loading skeleton for description */}
              <div className="w-32 h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>
              
              {/* Loading skeleton for button */}
              <div className="w-28 h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </>
      )}

      {/* Map through creators */}
      {creators.length > 0 && creators.map((creator, index) => (
        <div
          key={index}
          className={`
            group flex flex-col items-center p-6 rounded-2xl border shadow-lg
            ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
            transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
          `}
        >
          {/* Profile Picture - Using CORRECT YouTube channel profile images */}
          <div className="relative mb-4 w-24 h-24 overflow-hidden rounded-full border-4 border-primary">
            <img
              src={creator.fallbackImage}
              alt={creator.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to a default avatar if image fails to load
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=random&size=96`;
              }}
            />
          </div>

          {/* Creator Name */}
          <h3 className={`text-xl font-semibold mb-2 text-center ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} transition-colors duration-300`}>
            {creator.name}
          </h3>

          {/* Creator Description */}
          <p className={`text-sm text-center mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {creator.description}
          </p>

          {/* YouTube Button */}
          <a
            href={creator.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto py-3 px-6 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            View Channel
          </a>
        </div>
      ))}

      {/* "And Many More" card */}
      <div
        className={`
          group flex flex-col items-center p-6 rounded-2xl border shadow-lg overflow-hidden
          ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
          transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
        `}
      >
        {/* Icon */}
        <div className="relative mb-4 w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z"/>
          </svg>
        </div>

        {/* Text */}
        <h3 className={`text-xl font-semibold mb-2 text-center ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          And Many More
        </h3>

        <p className={`text-sm text-center mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
          Discover our complete creator network
        </p>

        {/* View More Button */}
        <Link
          to="/courses"
          className="mt-auto py-3 px-6 rounded-xl text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default CreatorsContainer;