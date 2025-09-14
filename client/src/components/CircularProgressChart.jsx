import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaExpand, FaCompress } from 'react-icons/fa';

const CircularProgressChart = ({ 
  progressData = [],
  totalCourses = 0,
  completedCourses = 0,
  inProgressCourses = 0,
  title = "Learning Progress",
  className = "",
  onSegmentClick // New prop for handling segment clicks
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Interactive state
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [hiddenSegments, setHiddenSegments] = useState(new Set());

  // Calculate percentages
  const completedPercentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  const inProgressPercentage = totalCourses > 0 ? (inProgressCourses / totalCourses) * 100 : 0;
  const notStartedPercentage = 100 - completedPercentage - inProgressPercentage;

  // SVG circle parameters
  const size = isExpanded ? 300 : 200;
  const strokeWidth = isExpanded ? 25 : 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  // Calculate stroke dash arrays for each segment
  const completedStroke = (completedPercentage / 100) * circumference;
  const inProgressStroke = (inProgressPercentage / 100) * circumference;
  const notStartedStroke = (notStartedPercentage / 100) * circumference;

  // Segment data for interactions with your requested colors
  const segments = [
    {
      id: 'completed',
      label: 'Completed',
      value: completedCourses,
      percentage: completedPercentage,
      color: '#9F7AEA', // Purple
      bgColor: 'bg-purple-400',
      stroke: completedStroke,
      offset: 0,
      description: 'Courses you have successfully completed'
    },
    {
      id: 'inProgress',
      label: 'In Progress',
      value: inProgressCourses,
      percentage: inProgressPercentage,
      color: '#22D3EE', // Cyan
      bgColor: 'bg-cyan-400',
      stroke: inProgressStroke,
      offset: -completedStroke,
      description: 'Courses you are currently taking'
    },
    {
      id: 'notStarted',
      label: 'Not Started',
      value: totalCourses - completedCourses - inProgressCourses,
      percentage: notStartedPercentage,
      color: '#CBD5E1', // Grey
      bgColor: 'bg-gray-300',
      stroke: notStartedStroke,
      offset: -(completedStroke + inProgressStroke),
      description: 'Courses available to start'
    }
  ];

  // Handle segment interactions
  const handleSegmentHover = (segment, event) => {
    if (hiddenSegments.has(segment.id)) return;
    
    setHoveredSegment(segment.id);
    setTooltipData({
      label: segment.label,
      value: segment.value,
      percentage: Math.round(segment.percentage),
      description: segment.description,
      x: event.clientX,
      y: event.clientY
    });
    setShowTooltip(true);
  };

  const handleSegmentLeave = () => {
    setHoveredSegment(null);
    setShowTooltip(false);
  };

  const handleSegmentClick = (segment) => {
    if (onSegmentClick) {
      onSegmentClick(segment);
    }
  };

  const toggleSegmentVisibility = (segmentId) => {
    const newHidden = new Set(hiddenSegments);
    if (newHidden.has(segmentId)) {
      newHidden.delete(segmentId);
    } else {
      newHidden.add(segmentId);
    }
    setHiddenSegments(newHidden);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${className} ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} rounded-2xl p-6 shadow-lg transition-all duration-300 ${isExpanded ? 'transform scale-105' : ''}`}>
      {/* Header with controls */}
      <div className="mb-6 flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          {title}
        </h3>
        <div className="flex space-x-2">
          <motion.button
            onClick={toggleExpanded}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-bg-tertiary text-dark-text-secondary' : 'hover:bg-light-bg-tertiary text-light-text-secondary'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
          </motion.button>
        </div>
      </div>

      <div className={`flex flex-col ${isExpanded ? 'lg:flex-col' : 'lg:flex-row'} items-center gap-8`}>
        {/* Interactive Circular Chart */}
        <div className="relative">
          <motion.svg
            width={size}
            height={size}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="transform -rotate-90 cursor-pointer"
            style={{ filter: hoveredSegment ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none' }}
          >
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={isDark ? '#374151' : '#E5E7EB'}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Interactive segments */}
            {segments.map((segment) => {
              if (hiddenSegments.has(segment.id) || segment.stroke === 0) return null;
              
              const isHovered = hoveredSegment === segment.id;
              
              return (
                <motion.circle
                  key={segment.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={segment.color}
                  strokeWidth={isHovered ? strokeWidth + 5 : strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${segment.stroke} ${circumference}`}
                  strokeDashoffset={segment.offset}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 10px ${segment.color})` : 'none',
                    opacity: hoveredSegment && !isHovered ? 0.6 : 1
                  }}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ 
                    strokeDasharray: `${segment.stroke} ${circumference}`,
                    strokeWidth: isHovered ? strokeWidth + 5 : strokeWidth
                  }}
                  transition={{ duration: 1, delay: segments.indexOf(segment) * 0.2 + 0.2 }}
                  onMouseEnter={(e) => handleSegmentHover(segment, e)}
                  onMouseLeave={handleSegmentLeave}
                  onClick={() => handleSegmentClick(segment)}
                />
              );
            })}
          </motion.svg>

          {/* Interactive center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <motion.div 
                className={`text-3xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                animate={{ 
                  scale: hoveredSegment ? 1.1 : 1,
                  color: hoveredSegment ? segments.find(s => s.id === hoveredSegment)?.color : undefined
                }}
                transition={{ duration: 0.2 }}
              >
                {hoveredSegment ? 
                  segments.find(s => s.id === hoveredSegment)?.value || totalCourses : 
                  totalCourses
                }
              </motion.div>
              <div className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {hoveredSegment ? 
                  segments.find(s => s.id === hoveredSegment)?.label.toLowerCase() : 
                  'total courses'
                }
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interactive Legend */}
        <div className="space-y-4">
          {segments.map((segment, index) => {
            const isHidden = hiddenSegments.has(segment.id);
            const isHovered = hoveredSegment === segment.id;
            
            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isHidden ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className={`flex items-center justify-between space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  isHovered ? (isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary') : ''
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                onMouseEnter={(e) => handleSegmentHover(segment, e)}
                onMouseLeave={handleSegmentLeave}
                onClick={() => handleSegmentClick(segment)}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className={`w-4 h-4 ${segment.bgColor} rounded-full transition-all duration-200`}
                    animate={{ 
                      scale: isHovered ? 1.3 : 1,
                      boxShadow: isHovered ? `0 0 10px ${segment.color}` : 'none'
                    }}
                  />
                  <div className={`${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    <span className="font-semibold">{segment.label}</span>
                    <span className={`ml-2 text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      — {segment.value} ({Math.round(segment.percentage)}%)
                    </span>
                  </div>
                </div>
                
                {/* Toggle visibility button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSegmentVisibility(segment.id);
                  }}
                  className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-dark-bg-primary text-dark-text-secondary' : 'hover:bg-light-bg-primary text-light-text-secondary'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isHidden ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                </motion.button>
              </motion.div>
            );
          })}

          {/* Additional stats with animation */}
          <motion.div 
            className={`pt-4 border-t ${isDark ? 'border-dark-border' : 'border-light-border'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Overall completion rate
            </p>
            <motion.p 
              className="text-2xl font-bold text-primary"
              animate={{ 
                scale: hoveredSegment === 'completed' ? 1.1 : 1,
                color: hoveredSegment === 'completed' ? '#9F7AEA' : undefined
              }}
            >
              {Math.round(completedPercentage)}%
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Interactive Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed z-50 p-3 rounded-lg shadow-lg pointer-events-none ${
              isDark ? 'bg-dark-bg-primary border border-dark-border' : 'bg-light-bg-primary border border-light-border'
            }`}
            style={{
              left: tooltipData.x + 10,
              top: tooltipData.y - 80,
              transform: 'translate(-50%, 0)'
            }}
          >
            <div className={`text-sm font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              {tooltipData.label}
            </div>
            <div className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              {tooltipData.value} courses ({tooltipData.percentage}%)
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
              {tooltipData.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircularProgressChart;
