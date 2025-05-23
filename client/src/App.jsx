import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./store/auth";
import { useTheme } from "./context/ThemeContext";
import { LoadingProvider } from "./components/loadingContext.jsx";
import 'react-toastify/ReactToastify.css';

// Always loaded components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader";

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const LogOut = lazy(() => import("./pages/LogOut"));
const Courses = lazy(() => import("./pages/Courses"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CoursePlayer = lazy(() => import("./pages/CoursePlayer"));
const Roadmap = lazy(() => import("./pages/Roadmap"));

// Admin components
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminUsers = lazy(() => import("./layouts/AdminUsers"));
const AdminContacts = lazy(() => import("./layouts/AdminContacts"));
const AdminCourses = lazy(() => import("./layouts/CourseLayout/AdminCourses"));
const AdminUpdate = lazy(() => import("./layouts/AdminUpdate"));
const AddNewCourse = lazy(() => import("./layouts/CourseLayout/AddNewCourse.jsx"));
const CourseUpdate = lazy(() => import("./layouts/CourseLayout/CourseUpdate"));
function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Router>
      <LoadingProvider>
        <div className={`flex flex-col min-h-screen ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
          <header className="fixed top-0 z-50 w-full">
            <NavBar />
          </header>
          <main className="flex-grow pt-16">
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CoursePlayer />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="users/:id/edit" element={<AdminUpdate />} />
                  <Route path="contacts" element={<AdminContacts />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route path="courses/add" element={<AddNewCourse />} />
                  <Route path="courses/update/:id" element={<CourseUpdate />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </LoadingProvider>
    </Router>
  );
}

export default App;
