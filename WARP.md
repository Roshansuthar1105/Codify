# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

Codify is a full-stack interactive coding learning platform built with React (frontend) and Node.js/Express (backend). The platform features user authentication, course management, progress tracking, and an admin panel for content management.

## Development Commands

### Frontend (client/)
```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Backend (server/)
```bash
# Install dependencies
npm install

# Start development server with auto-reload (localhost:5050)
npm start

# Start production server
npm run server
```

### Full Stack Development
```bash
# Run both frontend and backend simultaneously
# Terminal 1: cd client && npm run dev
# Terminal 2: cd server && npm start
```

### Testing Commands
Currently no test suite is configured. The project uses basic validation and error handling without dedicated test files.

## Architecture & Structure

### Frontend Architecture
- **Framework**: React 18 with Vite for build tooling
- **Routing**: React Router with lazy loading for performance optimization
- **State Management**: Context API with custom providers (AuthContext, ThemeContext)
- **Styling**: TailwindCSS with custom theme system supporting dark/light modes and color customization
- **Component Architecture**: Modular components with clear separation of concerns

### Backend Architecture
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with bcrypt password hashing
- **API Design**: RESTful endpoints with clear route separation
- **Middleware**: Custom auth, admin, and error handling middleware

### Key Architectural Patterns

#### Frontend State Management
The app uses a custom context pattern with two main contexts:
- `AuthContext`: Manages user authentication, token storage, and API calls
- `ThemeContext`: Handles theme switching (dark/light) and color customization

#### Backend Structure
- **Controllers**: Handle business logic and API responses
- **Models**: Mongoose schemas for data modeling
- **Routes**: Express routers for endpoint organization
- **Middleware**: Authentication, authorization, and validation layers
- **Utils**: Database connection and helper functions

#### Authentication Flow
1. JWT tokens stored in localStorage (frontend)
2. Bearer token authentication for protected routes
3. Role-based access control (admin vs regular users)
4. Password hashing with bcrypt

### Database Schema

#### User Model
- `username`, `email`, `password`, `phone`
- `isAdmin` boolean for role management
- `watchlist` array of course references

#### Course Model
- `course_category`, `course_title`, `description`
- `creator_name`, `creator_youtube_link`, `creator_image`
- `course_image`

#### Additional Models
- `UserActivity`: Tracks user interactions
- `CourseProgress`: Monitors learning progress
- `Feedback`: Stores contact form submissions

### Theme System
The application features a sophisticated theme system:
- **Dark/Light Mode**: Toggle between themes
- **Color Customization**: 6 predefined color schemes (purple, blue, green, red, orange, teal)
- **CSS Variables**: Dynamic theme switching via CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Environment Setup

### Frontend Environment (.env)
```
VITE_SERVER_API=http://localhost:5050
VITE_YOUTUBE_API=your_youtube_api_key
```

### Backend Environment (.env)
```
MONGODB_URI=mongodb_connection_string
PORT=5050
JWT_SECRET=your_jwt_secret
CLIENT_CORS=http://localhost:5173
```

### Database Connection
The app uses a shared MongoDB instance (URI provided in README). For local development, you can use the provided URI or set up your own MongoDB instance.

## API Endpoints Structure

### Authentication Routes (`/api/v1/auth`)
- POST `/register` - User registration
- POST `/login` - User login
- GET `/user` - Get current user (protected)

### Course Routes (`/api/v1/courses`)
- GET `/` - Fetch all courses
- POST `/` - Create course (admin only)
- PUT `/:id` - Update course (admin only)
- DELETE `/:id` - Delete course (admin only)

### User Routes (`/user`)
- GET `/watchlist` - Get user watchlist
- POST `/addToWatchlist` - Add/remove course from watchlist

### Progress & Activity
- GET `/progress` - User progress data
- POST `/activity` - Track user activity

### Admin Routes (`/admin`)
- User management endpoints
- Course management endpoints
- Contact form management

## Component Structure

### Page Components (`pages/`)
- `Home.jsx` - Landing page with features showcase
- `Courses.jsx` - Course catalog with filtering
- `Dashboard.jsx` - User dashboard with progress tracking
- `CoursePlayer.jsx` - Individual course viewing
- `About.jsx`, `ContactUs.jsx` - Static pages

### Layout Components (`layouts/`)
- `AdminLayout.jsx` - Admin panel wrapper with nested routing
- Course management layouts in `CourseLayout/`

### Reusable Components (`components/`)
- `NavBar.jsx` - Navigation with theme switching
- `Footer.jsx` - Site footer
- `YouTubePlayer.jsx` - Video player integration
- `ThemeSwitcher.jsx`, `ThemeColorSelector.jsx` - Theme controls
- Home page specific components in `HomePageComponents/`

## Development Guidelines

### Code Organization
- Components are organized by functionality and reusability
- API calls are centralized in AuthContext
- Styling uses Tailwind utility classes with custom theme variables
- Lazy loading is implemented for route-level code splitting

### Authentication Handling
- All authenticated routes check `isLoggedIn` from AuthContext
- Admin routes additionally check `userdata.isAdmin`
- JWT tokens are automatically attached to API requests

### Theme Development
- Use CSS custom properties defined in TailwindCSS config
- Dark/light themes are handled via CSS classes
- Color themes are dynamically applied via CSS variables

### Performance Considerations
- React.lazy() for route-level code splitting
- Suspense boundaries with loading states
- Image optimization and responsive images
- Tailwind CSS purging for production builds

### Error Handling
- Frontend: Toast notifications for user feedback
- Backend: Centralized error middleware
- Validation errors are handled gracefully

## Common Development Patterns

### Adding New Pages
1. Create component in `pages/`
2. Add route to `App.jsx`
3. Implement lazy loading if needed
4. Add navigation link if required

### Adding New API Endpoints
1. Define route in appropriate router file
2. Create controller function
3. Add middleware if needed (auth, admin)
4. Update frontend API calls in contexts

### Theme Customization
- Colors defined in `client/src/context/ThemeContext.jsx`
- Tailwind config in `client/tailwind.config.js`
- CSS variables applied dynamically

### Admin Features
- Protected by `adminMiddleware.js`
- Nested routes under `/admin`
- CRUD operations for courses and user management

This architecture supports a scalable learning platform with clear separation of concerns, robust authentication, and a modern, customizable user interface.
