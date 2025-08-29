import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./store/auth";
import { useTheme } from "./context/ThemeContext";
import { LoadingProvider } from "./components/loadingContext.jsx";
import 'react-toastify/ReactToastify.css';

// Always loaded components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
 

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
const NotesPage = lazy(() => import("./pages/NotesPage"));
const Notes = lazy(() => import("./pages/NotesComponent.jsx"));
const ContributorsGuide = lazy(() => import("./pages/ContributorGuide.jsx"))
const ContributorsPage = lazy(()=>import("./components/Contributor.jsx"))
const Bookmarks = lazy(() => import("./pages/Bookmarks"));

const PythonNotes = lazy(() => import("./pages/PythonNotes"));

// Admin components
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminUsers = lazy(() => import("./layouts/AdminUsers"));
const AdminContacts = lazy(() => import("./layouts/AdminContacts"));
const AdminCourses = lazy(() => import("./layouts/CourseLayout/AdminCourses"));
const AdminUpdate = lazy(() => import("./layouts/AdminUpdate"));
const AddNewCourse = lazy(() => import("./layouts/CourseLayout/AddNewCourse.jsx"));
const CourseUpdate = lazy(() => import("./layouts/CourseLayout/CourseUpdate"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger on route change

  return children;
};
function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Router>
      <ScrollToTop>
      <LoadingProvider>
        <div className={`flex flex-col min-h-screen ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
          <header className="fixed top-0 z-50 w-full">
            <NavBar />
          </header>
          <main className="flex-grow pt-16">
            <Suspense fallback={
              <Loader />
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CoursePlayer />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/contributors" element = {<ContributorsPage/>}/>
                <Route path="/notes" element = {<NotesPage/>}/>
                <Route path="/notes/:subjectname" element = {<Notes/>}/>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contributorGuide" element={<ContributorsGuide />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="users/:id/edit" element={<AdminUpdate />} />
                  <Route path="contacts" element={<AdminContacts />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route path="courses/add" element={<AddNewCourse />} />
                  <Route path="courses/update/:id" element={<CourseUpdate />} />
                </Route>
               
                <Route path="/notes/Python" element={<PythonNotes />} />
              </Routes>
            </Suspense>
          </main>
          <ScrollToTopButton />
          <Footer />
        </div>
      </LoadingProvider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
