📘 Codify – Learn & Explore
===========================

Welcome to **Codify**! This guide helps you quickly understand the project’s purpose, how it works, and how you can start contributing. Whether you’re here to explore, learn, or build, this file will walk you through everything you need to know.

🚀 What is Codify?
------------------

Codify is an **interactive coding learning platform** designed to make programming education **accessible, engaging, and effective**. It combines structured courses, personalized learning paths, and an admin system to deliver a full educational experience.

Think of it as a blend of **freeCodeCamp + Udemy + Coursera**, but open-source and community-driven.

✨ Core Features
---------------

### For Learners

*   Interactive coding lessons with videos and exercises
    
*   Personalized dashboard with progress tracking
    
*   Roadmaps for structured learning
    
*   Dark/light theme customization
    
*   Watchlist to save and manage courses
    
*   Responsive UI for all devices
    

### For Admins

*   Admin dashboard to manage users, courses, and analytics
    
*   Course creation and editing tools
    
*   User progress monitoring
    
*   Engagement and usage analytics
    

🛠 Tech Overview
----------------

Codify follows a **full-stack MERN architecture**:

### Frontend (client/)

*   React 18 + Vite (modern, fast build tool)
    
*   TailwindCSS for styling
    
*   React Router for navigation
    
*   Context API for global state management
    
*   JWT-based authentication
    

### Backend (server/)

*   Node.js + Express
    
*   MongoDB with Mongoose for data modeling
    
*   REST API endpoints for courses, users, progress, and activity
    
*   Middleware for authentication, validation, and error handling
    

### DevOps & Tools

*   Netlify for frontend hosting
    
*   Firebase workflows for CI/CD
    
*   ESLint for code quality
    
*   GitHub for version control
    

📂 Project Structure
--------------------
```bash
├── .github
    ├── ISSUE_TEMPLATE
    │   ├── bug_report.md
    │   └── feature_request.md
    └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── License
├── README2.md
├── Readme.md
├── client
    ├── .env.example
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── README.md
    ├── index.html
    ├── netlify.toml
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── Background.mp4
    │   ├── Videos
    │   │   ├── vid1.mp4
    │   │   ├── vid2.mp4
    │   │   ├── vid3.mp4
    │   │   ├── vid4.mp4
    │   │   ├── vid5.mp4
    │   │   ├── vid6.mp4
    │   │   ├── vid7.mp4
    │   │   └── vid8.mp4
    │   ├── aboutus.png
    │   ├── backgroundImage.jpg
    │   ├── codify.png
    │   ├── contact.png
    │   ├── favicon.png
    │   ├── home
    │   │   ├── 3d-icon-with-pencil-ruller.zip
    │   │   ├── Designer.jpg
    │   │   ├── Designer.png
    │   │   ├── bg.jpeg
    │   │   ├── bg1.jpg
    │   │   ├── bg2.jpg
    │   │   ├── bg2.zip
    │   │   ├── flat-design-abstract-background.zip
    │   │   ├── modern-design-with-rose-gold-lines.zip
    │   │   ├── pencil.svg
    │   │   └── planet.svg
    │   ├── loader.mp4
    │   ├── loading.json
    │   ├── loading.svg
    │   ├── login.svg
    │   ├── manifest.json
    │   ├── robots.txt
    │   ├── signup.svg
    │   ├── sitemap.xml
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── json
    │   │   │   ├── courses.json
    │   │   │   ├── roadmap.json
    │   │   │   └── skillbasedRoadmaps.json
    │   │   └── react.svg
    │   ├── components
    │   │   ├── CardBody.jsx
    │   │   ├── CodePlayground.jsx
    │   │   ├── ContinueWatching.jsx
    │   │   ├── CourseModules.jsx
    │   │   ├── CoursesList.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HomePageComponents
    │   │   │   ├── CallToAction.jsx
    │   │   │   ├── ChooseUs.jsx
    │   │   │   ├── Contributor.jsx
    │   │   │   ├── CreatorsContainer.jsx
    │   │   │   ├── FAQ.jsx
    │   │   │   ├── NewsLetter.jsx
    │   │   │   └── Testimonials.jsx
    │   │   ├── Loader.jsx
    │   │   ├── MobileMenu.jsx
    │   │   ├── NavBar.jsx
    │   │   ├── ScrollToTopButton.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── TailwindTest.jsx
    │   │   ├── ThemeColorSelector.jsx
    │   │   ├── ThemeSwitcher.jsx
    │   │   ├── UserActivity.jsx
    │   │   ├── YouTubePlayer.jsx
    │   │   ├── YouTubePlaylist.jsx
    │   │   └── loadingContext.jsx
    │   ├── context
    │   │   └── ThemeContext.jsx
    │   ├── index.css
    │   ├── layouts
    │   │   ├── AdminContacts.jsx
    │   │   ├── AdminLayout.jsx
    │   │   ├── AdminUpdate.jsx
    │   │   ├── AdminUsers.jsx
    │   │   └── CourseLayout
    │   │   │   ├── AddNewCourse.jsx
    │   │   │   ├── AdminCourses.jsx
    │   │   │   ├── CourseForm.jsx
    │   │   │   └── CourseUpdate.jsx
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── About.jsx
    │   │   ├── ContactUs.jsx
    │   │   ├── ContributorGuide.jsx
    │   │   ├── CoursePlayer.jsx
    │   │   ├── Courses.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ErrorPage.jsx
    │   │   ├── Home.jsx
    │   │   ├── LogOut.jsx
    │   │   ├── Login.jsx
    │   │   ├── Roadmap.jsx
    │   │   └── Signup.jsx
    │   ├── store
    │   │   └── auth.jsx
    │   └── utils
    │   │   └── youtubeUtils.js
    ├── tailwind.config.js
    └── vite.config.js
├── package-lock.json
├── package.json
└── server
    ├── .env.example
    ├── .github
        └── workflows
        │   ├── firebase-hosting-merge.yml
        │   └── firebase-hosting-pull-request.yml
    ├── .gitignore
    ├── README.md
    ├── controllers
        ├── activityController.js
        ├── adminController.js
        ├── authController.js
        ├── contactController.js
        ├── coursesController.js
        ├── progressController.js
        └── userController.js
    ├── dataconnect-generated
        └── js
        │   └── default-connector
        │       ├── esm
        │           ├── index.esm.js
        │           └── package.json
        │       ├── index.cjs.js
        │       ├── index.d.ts
        │       └── package.json
    ├── dataconnect
        ├── connector
        │   ├── connector.yaml
        │   ├── mutations.gql
        │   └── queries.gql
        ├── dataconnect.yaml
        └── schema
        │   └── schema.gql
    ├── middlewares
        ├── adminMiddleware.js
        ├── authMiddleware.js
        ├── errorMiddlewares.js
        └── validateMiddleware.js
    ├── models
        ├── courseProgressSchema.js
        ├── courseSchema.js
        ├── feedbackSchema.js
        ├── userActivitySchema.js
        └── userSchema.js
    ├── package-lock.json
    ├── package.json
    ├── public
        ├── 404.html
        └── index.html
    ├── routes
        ├── activityRoute.js
        ├── adminRouter.js
        ├── authRouter.js
        ├── contactRoute.js
        ├── coursesRoute.js
        ├── progressRoute.js
        ├── router.js
        └── userRoute.js
    ├── server.js
    ├── utils
        └── db.js
    └── validations
        └── authValidation.js

```

📥 Getting Started
------------------

### Prerequisites

*   Node.js (>=16)
    
*   npm or yarn
    
*   MongoDB (local or Atlas)
    

### Setup Steps

1.  git clone https://github.com/Roshansuthar1105/Codify.git
    
2.  cd codify/clientnpm installcp .env.example .env # configure API keysnpm run devRuns at: http://localhost:5173
    
3.  cd ../servernpm installcp .env.example .env # configure MongoDB + JWT secretnpm startRuns at: http://localhost:5050
    

⚡ Both **client** and **server** should run simultaneously.

📚 API Endpoints (Quick Reference)
----------------------------------

### Auth

*   POST /api/auth/register → Register a new user
    
*   POST /api/auth/login → Login
    
*   GET /api/auth/me → Get user profile
    

### Courses

*   GET /api/v1/courses → List all courses
    
*   POST /api/v1/courses → Create new course (Admin)
    
*   PUT /api/v1/courses/:id → Update course (Admin)
    
*   DELETE /api/v1/courses/:id → Delete course (Admin)
    

### Progress

*   GET /api/progress/:courseId → Get user progress
    
*   PUT /api/progress/:courseId → Update progress
    

### Watchlist

*   GET /api/user/watchlist → Get watchlist
    
*   POST /api/user/addToWatchlist → Add/remove courses
    

🤝 Contributing
---------------

Codify is **open to contributions**! 🎉

1.  Fork the repo & clone locally
    
2.  Create a new feature branch
    
3.  Implement changes & commit
    
4.  Push to your fork
    
5.  Open a PR 🚀
    

➡️ Check the detailed [Contributor Guide](https://codifylearn.netlify.app/ContributorsGuide) inside the app.

🗺 Roadmap
----------

*   Mobile app (React Native)
    
*   Code playground with real-time editor
    
*   Gamification (badges, achievements)
    
*   AI-powered course recommendations
    
*   Peer-to-peer mentorship
    
*   Discussion forums
    

❤️ Acknowledgments
------------------

*   Inspired by **freeCodeCamp, Udemy, and Coursera**
    
*   Built with love by the **Codify Team & contributors**
    
*   Thanks to the **open-source community**
    

👉 Now you’re ready to explore Codify. Start with client/ for frontend, or server/ for backend, and help us make coding education better for everyone!