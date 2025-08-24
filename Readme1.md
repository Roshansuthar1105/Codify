# Codify - Interactive Coding Learning Platform

<div align="center">
  <img src="https://github.com/user-attachments/assets/18bb2c91-12e4-45e7-b1e6-2cbee943975c" alt="Codify Banner" width="800"/>
  <p><em>Master coding with interactive courses, personalized learning paths, and expert-curated roadmaps</em></p>

  [![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://codifylearn.netlify.app)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Performance Optimizations](#-performance-optimizations)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Overview

Codify is a comprehensive educational platform designed to help users learn coding through interactive courses, personalized learning paths, and expert-curated roadmaps. The platform features a modern, responsive interface with dark/light theme support, progress tracking, and a robust course management system.

Our mission is to make coding education accessible, engaging, and effective for learners at all levels, from beginners to advanced developers.

## ✨ Key Features

### For Learners
- **Interactive Courses**: Engage with dynamic coding lessons and tutorials
- **Personalized Dashboard**: Track your progress, continue watching, and manage saved courses
- **Course Roadmaps**: Follow structured learning paths for different programming domains
- **Dark/Light Theme**: Choose your preferred visual experience with theme color customization
- **Progress Tracking**: Monitor your learning journey with detailed statistics
- **Responsive Design**: Seamless experience across all devices

### For Administrators
- **Comprehensive Admin Panel**: Manage users, courses, and content
- **Course Management**: Add, edit, and organize courses and learning materials
- **User Management**: Monitor user activity and progress
- **Analytics Dashboard**: Track platform usage and engagement metrics

## 🛠️ Tech Stack

### Frontend
- **React 18**: Component-based UI development
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing
- **Context API**: State management
- **Lazy Loading**: Performance optimization for components and routes
- **JWT Authentication**: Secure user authentication

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication

### DevOps & Tools
- **Vite**: Next-generation frontend tooling
- **ESLint**: Code quality and style checking
- **Netlify**: Frontend deployment and hosting
- **Git & GitHub**: Version control and collaboration

## 🔧 Performance Optimizations

Codify implements several performance optimization techniques:

1. **Lazy Loading**: Components and routes are loaded on demand
2. **Code Splitting**: Bundle splitting for faster initial load times
3. **Memoization**: Prevents unnecessary re-renders with useMemo and useCallback
4. **Image Optimization**: Efficient image loading and rendering
5. **SEO Optimization**: Comprehensive meta tags and structured data
6. **Responsive Design**: Optimized for all device sizes

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/18bb2c91-12e4-45e7-b1e6-2cbee943975c" alt="Home Page" width="400"/>
  <img src="https://github.com/user-attachments/assets/b1a0dfcd-d7e5-4bb9-940f-ba6137ee2320" alt="Courses Page" width="400"/>
  <img src="https://github.com/user-attachments/assets/1f856972-a964-42a6-a552-d10867f8dc85" alt="Dashboard" width="400"/>
  <img src="https://github.com/user-attachments/assets/d9fb69da-0258-4a77-85be-f77cfcfd193d" alt="Course Player" width="400"/>
</div>

## 🌐 Live Demo

Experience Codify in action: [https://codifylearn.netlify.app](https://codifylearn.netlify.app)

### Demo Accounts
- **Regular User**:
  - Email: demo@codify.com
  - Password: demo123
- **Admin User**:
  - Email: admin@codify.com
  - Password: admin123

## 📥 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Roshansuthar1105/Codify.git
   ```
2. Navigate to the client directory
   ```bash
   cd codify/client
   ```
3. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file in the client directory with the following variables:
   ```
   VITE_SERVER_API=http://localhost:5050
   VITE_YOUTUBE_API=your_youtube_api_key
   ```
5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. Open your browser and navigate to `http://localhost:5173`

### Backend Setup
1. Clone the backend repository
   ```bash
   git clone https://github.com/Roshansuthar1105/Codify.git
   ```
2. Navigate to the server directory
   ```bash
   cd codify/server
   ```
3. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string/or ask the repo owner for the URI
   PORT=5050
   JWT_SECRET=your_jwt_secret
   CLIENT_CORS=http://localhost:5173
   ```
5. Start the server
   ```bash
   npm start
   # or
   yarn start
   ```

## Note:
 You might need to run both the client and server simultaneously for fetching data in your local machine.

## 📁 Project Structure

```
client/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers
│   ├── layouts/        # Page layout components
│   ├── pages/          # Main application pages
│   ├── store/          # State management
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
└── vite.config.js      # Vite configuration

server/
├── controllers/        # Request handlers
├── models/             # Database models
├── routes/             # API routes
├── middleware/         # Custom middleware
├── utils/              # Utility functions
└── server.js           # Server entry point
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Course Endpoints
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get a specific course
- `POST /api/v1/courses` - Create a new course (admin only)
- `PUT /api/v1/courses/:id` - Update a course (admin only)
- `DELETE /api/v1/courses/:id` - Delete a course (admin only)

### User Progress Endpoints
- `GET /api/progress` - Get user's progress for all courses
- `GET /api/progress/:courseId` - Get user's progress for a specific course
- `PUT /api/progress/:courseId` - Update user's progress for a course

### User Activity Endpoints
- `GET /api/activity` - Get user's activity history
- `POST /api/activity/add` - Add a new activity record

### Watchlist Endpoints
- `GET /api/user/watchlist` - Get user's watchlist
- `POST /api/user/addToWatchlist` - Add/remove a course to/from watchlist

## 🤝 Contributing

We welcome contributions to Codify! Here's how you can help:

> **Contributor Guide:**  
> Visit [`/ContributorsGuide`](https://codifylearn.netlify.app/ContributorsGuide) in the app for a step-by-step, beginner-friendly guide.  
> This page covers the Git workflow, pull request creation, FAQs, and helpful resources to make your first contribution smooth and enjoyable.

1. Fork the repository
2. Add an upstream to keep your fork synchronized with the original repository
   ```bash
   git remote add upstream https://github.com/Roshansuthar1105/Codify.git
   ```
3. Fetch Changes from the upstream
   ```bash
   git fetch upstream
   ```
3. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. Commit your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 🗺️ Roadmap

- [ ] Mobile application (React Native)
- [ ] Interactive code editor and playground
- [ ] Peer-to-peer learning and mentorship
- [ ] Gamification elements (badges, achievements)
- [ ] AI-powered learning recommendations
- [ ] Community forums and discussion boards
- [ ] Integration with GitHub for project-based learning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by leading educational platforms like Coursera, Udemy, and freeCodeCamp
- Special thanks to all contributors and the open-source community
- YouTube API for video content integration
- All the amazing instructors who provided course content

---

<div align="center">
  <p>Made with ❤️ by the Codify Team</p>
  <p>
    <a href="https://twitter.com/codifylearn">Twitter</a> •
    <a href="https://facebook.com/codifylearn">Facebook</a> •
    <a href="https://instagram.com/codifylearn">Instagram</a> •
    <a href="mailto:contact@codifylearn.com">Contact</a>
  </p>
</div>