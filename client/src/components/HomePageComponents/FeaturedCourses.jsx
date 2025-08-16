import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaPlay, FaClock, FaUser, FaStar } from "react-icons/fa";

const FeaturedCourses = ({ courses = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sample featured courses if none provided
  const featuredCourses = courses.length > 0 ? courses.slice(0, 6) : [
    {
      id: 1,
      title: "Complete React Developer Course",
      description: "Master React from basics to advanced concepts with hands-on projects",
      instructor: "John Doe",
      duration: "12 hours",
      students: 1540,
      rating: 4.8,
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      category: "Frontend",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Node.js Backend Masterclass",
      description: "Build robust backend applications with Node.js, Express, and MongoDB",
      instructor: "Jane Smith",
      duration: "18 hours",
      students: 890,
      rating: 4.9,
      price: "$99.99",
      image: "https://images.unsplash.com/photo-1555066931-4365d9b0d0c7?w=400&h=250&fit=crop",
      category: "Backend",
      level: "Advanced"
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Learn Python programming and data analysis for real-world applications",
      instructor: "Mike Johnson",
      duration: "15 hours",
      students: 2100,
      rating: 4.7,
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      category: "Data Science",
      level: "Beginner"
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      description: "Complete course covering frontend, backend, and database technologies",
      instructor: "Sarah Wilson",
      duration: "25 hours",
      students: 1200,
      rating: 4.8,
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "Full Stack",
      level: "Advanced"
    },
    {
      id: 5,
      title: "JavaScript Fundamentals",
      description: "Master JavaScript basics, ES6+, and modern programming patterns",
      instructor: "David Brown",
      duration: "10 hours",
      students: 3200,
      rating: 4.6,
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      category: "Frontend",
      level: "Beginner"
    },
    {
      id: 6,
      title: "DevOps & CI/CD Pipeline",
      description: "Learn modern DevOps practices, Docker, Kubernetes, and automation",
      instructor: "Lisa Chen",
      duration: "20 hours",
      students: 750,
      rating: 4.9,
      price: "$109.99",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
      category: "DevOps",
      level: "Intermediate"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Frontend': 'from-blue-500 to-cyan-500',
      'Backend': 'from-purple-500 to-pink-500',
      'Full Stack': 'from-green-500 to-teal-500',
      'Data Science': 'from-orange-500 to-red-500',
      'DevOps': 'from-indigo-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Courses</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-3xl mx-auto`}>
            Discover our most popular courses designed to accelerate your learning journey
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              className={`
                group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl
                border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                animate-fadeIn animation-delay-${(index + 1) * 100}
              `}
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(course.category)} text-white text-xs rounded-full font-medium`}>
                    {course.category}
                  </span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 ${getLevelColor(course.level)} text-xs rounded-full font-medium`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                        {course.rating}
                      </span>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                </div>

                {/* Course Title */}
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300 line-clamp-2`}>
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4 line-clamp-2`}>
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUser className="text-primary" />
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white text-center rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block"
                >
                  Enroll Now
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <div className="text-center mt-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 bg-transparent border-2 border-primary text-primary py-4 px-8 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-lg group"
          >
            <span>View All Courses</span>
            <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
