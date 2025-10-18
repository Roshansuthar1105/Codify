import { lazy, Suspense, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { LoadingProvider } from "./components/loadingContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import OfflineBanner from "./components/OfflineBanner";

// Always-loaded components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import Terms from "./pages/Terms.jsx";

// Lazy-loaded pages
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
const NotesPage = lazy(() => import("./pages/Notes/NotesPage"));
const FallBackNotes = lazy(() => import("./pages/Notes/FallBackNotes.jsx"));
const ContributorsGuide = lazy(() => import("./pages/ContributorGuide.jsx"));
const ContributorsPage = lazy(() => import("./components/Contributor.jsx"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const QuestionsPage = lazy(() => import("./pages/QuestionPage.jsx"));
const QuestionDetail = lazy(() => import("./components/QuestionDetail.jsx"));
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CodeEditor = lazy(() => import("./pages/CodeEditor"));

// Notes sub-sections
const JavaScriptFundamentals = lazy(() =>
  import("./pages/Notes/JavaScriptFundamentals/JavaScriptFundamentals.jsx")
);
const GitNotes = lazy(() =>
  import("./pages/Notes/GitVersionControl/GitNotes.jsx")
);
const ReactPattern = lazy(() =>
  import("./pages/Notes/ReactPatterns/ReactPattern.jsx")
);
const PythonFundamentals = lazy(() =>
  import("./pages/Notes/PythonFundamentals/PythonFundamentals.jsx")
);

// Admin layout
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminUsers = lazy(() => import("./layouts/AdminUsers"));
const AdminContacts = lazy(() => import("./layouts/AdminContacts"));
const AdminCourses = lazy(() => import("./layouts/CourseLayout/AdminCourses"));
const AdminUpdate = lazy(() => import("./layouts/AdminUpdate"));
const AddNewCourse = lazy(() =>
  import("./layouts/CourseLayout/AddNewCourse.jsx")
);
const CourseUpdate = lazy(() => import("./layouts/CourseLayout/CourseUpdate"));

/* Utility to scroll to top on route change */
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop>
        <LoadingProvider>
          <div
            className={`flex flex-col min-h-screen ${
              isDark
                ? "bg-dark-bg-primary text-dark-text-primary"
                : "bg-light-bg-primary text-light-text-primary"
            }`}
          >
            <header className="fixed top-0 z-50 w-full">
              <NavBar />
            </header>

            <OfflineBanner />

            <main className="flex-grow pt-16">
              <Suspense fallback={<Loader />}>
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
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/oauth/callback" element={<OAuthCallback />} />
                  <Route path="/terms" element={<Terms />} />

                  {/* Code editor aliases */}
                  <Route path="/code-editor" element={<CodeEditor />} />
                  <Route path="/editor" element={<CodeEditor />} />
                  <Route path="/ide" element={<CodeEditor />} />
                  <Route path="/playground" element={<CodeEditor />} />

                  {/* Notes section */}
                  <Route path="/notes/*" element={<NotesPage />} />
                  <Route
                    path="/notes/javascript/*"
                    element={<JavaScriptFundamentals />}
                  />
                  <Route
                    path="/notes/python/*"
                    element={<PythonFundamentals />}
                  />
                  <Route path="/notes/git/*" element={<GitNotes />} />
                  <Route path="/notes/react/*" element={<ReactPattern />} />
                  <Route path="/notes/:topic" element={<FallBackNotes />} />

                  {/* Misc pages */}
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/questions" element={<QuestionsPage />} />
                  <Route path="/questions/:id" element={<QuestionDetail />} />
                  <Route path="/contributors" element={<ContributorsPage />} />
                  <Route path="/contributorGuide" element={<ContributorsGuide />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id/edit" element={<AdminUpdate />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="courses/add" element={<AddNewCourse />} />
                    <Route
                      path="courses/update/:id"
                      element={<CourseUpdate />}
                    />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<ErrorPage />} />
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
