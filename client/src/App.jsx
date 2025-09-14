import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
const ContributorsPage = lazy(() => import("./components/Contributor.jsx"))
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const QuestionsPage = lazy(() => import("./pages/QuestionPage.jsx"));
const QuestionDetail = lazy(() => import("./components/QuestionDetail.jsx"))
const OAuthCallback = lazy(() => import("./pages/OAuthCallback"));

// Notes components
const JavaScriptFundamentals = lazy(() => import("./pages/Notes/JavaScriptFundamentals/JavaScriptFundamentals.jsx"));
const GitNotes = lazy(() => import("./pages/Notes/GitVersionControl/GitNotes.jsx"));
const ReactPattern = lazy(() => import("./pages/Notes/ReactPatterns/ReactPattern.jsx"));
const PythonNotes = lazy(() => import("./pages/Notes/PythonBasics/PythonNotes.jsx"));
// EDA Notes
const DataCollection = lazy(() => import("./pages/Notes/EDA/DataCollection.jsx"));
const DataExploration = lazy(() => import("./pages/Notes/EDA/DataExploration.jsx"));
const FeatureEngineering = lazy(() => import("./pages/Notes/EDA/FeatureEngineering.jsx"));
const StepsOfEDA = lazy(() => import("./pages/Notes/EDA/StepsOfEDA.jsx"));
const Visualization = lazy(() => import("./pages/Notes/EDA/Visualization.jsx"));
const Graphs = lazy(() => import("./pages/Notes/EDA/Graphs.jsx"));
const CaseStudies = lazy(() => import("./pages/Notes/EDA/CaseStudies.jsx"));
const BestPractices = lazy(() => import("./pages/Notes/EDA/BestPractices.jsx"));

// Admin components
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminUsers = lazy(() => import("./layouts/AdminUsers"));
const AdminContacts = lazy(() => import("./layouts/AdminContacts"));
const AdminCourses = lazy(() => import("./layouts/CourseLayout/AdminCourses"));
const AdminUpdate = lazy(() => import("./layouts/AdminUpdate"));
const AddNewCourse = lazy(() => import("./layouts/CourseLayout/AddNewCourse.jsx"));
const CourseUpdate = lazy(() => import("./layouts/CourseLayout/CourseUpdate"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CodeEditor = lazy(() => import("./components/CodeEditor..jsx"))

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    // Skip on initial mount to allow browser to restore scroll after refresh
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    // Scroll to top only on subsequent route changes
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
            <main className="flex-grow pt-14 sm:pt-16">
              <Suspense fallback={
                <Loader />
              }>
                <Routes>

                  {/* Pages Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/oauth/callback" element={<OAuthCallback />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:courseId" element={<CoursePlayer />} />
                  <Route path="/editor" element={<CodeEditor />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/questions" element={<QuestionsPage />} />
                  <Route path="/questions/:id" element={<QuestionDetail />} />

                  {/* Notes Routes */}
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/notes/:subjectname" element={<Notes />} />
                  <Route path="/notes/javascript/*" element={<JavaScriptFundamentals />} />
                  <Route path="/notes/python" element={<PythonNotes />} />
                  <Route path="/notes/git" element={<GitNotes />} />
                  <Route path="/notes/react" element={<ReactPattern />} />
                  {/* EDA Notes Routes */}
                  <Route path="/notes/eda/data-collection" element={<DataCollection />} />
                  <Route path="/notes/eda/data-exploration" element={<DataExploration />} />
                  <Route path="/notes/eda/feature-engineering" element={<FeatureEngineering />} />       
                  <Route path="/notes/eda/steps" element={<StepsOfEDA />} />
                  <Route path="/notes/eda/visualization" element={<Visualization />} />
                  <Route path="/notes/eda/graphs" element={<Graphs />} />
                  <Route path="/notes/eda/case-studies" element={<CaseStudies />} />
                  <Route path="/notes/eda/best-practices" element={<BestPractices />} />

                  {/* Auth Routes */}
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/logout" element={<LogOut />} />
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id/edit" element={<AdminUpdate />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="courses/add" element={<AddNewCourse />} />
                    <Route path="courses/update/:id" element={<CourseUpdate />} />
                  </Route>


                  {/* Other Routes */}
                  <Route path="/contributors" element={<ContributorsPage />} />
                  <Route path="/contributorGuide" element={<ContributorsGuide />} />
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