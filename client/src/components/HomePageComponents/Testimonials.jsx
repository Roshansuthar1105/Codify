import { useTheme } from "../../context/ThemeContext";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonials = [
    {
      quote: "The courses here transformed my career path. The practical approach to learning made all the difference.",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      company: "TechCorp Inc."
    },
    {
      quote: "I went from knowing nothing about coding to landing my dream job in just 6 months. The structured learning path was exactly what I needed.",
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      company: "StartupXYZ"
    },
    {
      quote: "The community support and expert guidance helped me overcome every challenge. Best learning investment I've made!",
      name: "Emma Rodriguez",
      role: "Backend Engineer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      company: "Digital Solutions"
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Students Say</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-2xl mx-auto`}>
            Real stories from real developers who transformed their careers with Codify
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                group relative p-8 rounded-2xl ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'}
                border shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl
                flex flex-col overflow-hidden
                ${isDark ? 'hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5' : 'hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5'}
              `}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>

              {/* Quote Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaQuoteLeft className="text-primary text-2xl group-hover:text-secondary transition-colors duration-300" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* Quote */}
              <p className={`italic mb-6 leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} group-hover:text-primary transition-colors duration-300`}>
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="mt-auto flex items-center">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-3 border-gradient-to-r from-primary to-secondary p-0.5 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className={`font-bold text-lg ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-1`}>
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Success Badge */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs rounded-full font-medium">
                  Success Story
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className={`text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
            Ready to join our success stories?
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-8 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;