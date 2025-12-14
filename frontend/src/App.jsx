import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateCoursePage from './pages/CreateCoursePage';
import BrowseCoursesPage from './pages/BrowseCoursesPage';
import MyAssignmentsPage from './pages/MyAssignmentsPage';
import MyGradesPage from './pages/MyGradesPage';
import SubmitAssignmentPage from './pages/SubmitAssignmentPage';
import CreateAssignmentPage from './pages/CreateAssignmentPage';
import ViewSubmissionsPage from './pages/ViewSubmissionsPage';
import GradeSubmissionPage from './pages/GradeSubmissionPage';
import ManageCoursesPage from './pages/ManageCoursesPage';
import ManageAssignmentsPage from './pages/ManageAssignmentsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Course Management */}
        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-courses"
          element={
            <ProtectedRoute>
              <BrowseCoursesPage />
            </ProtectedRoute>
          }
        />

        {/* Assignment Management */}
        <Route
          path="/my-assignments"
          element={
            <ProtectedRoute>
              <MyAssignmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-assignment/:assignmentId"
          element={
            <ProtectedRoute>
              <SubmitAssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-assignment"
          element={
            <ProtectedRoute>
              <CreateAssignmentPage />
            </ProtectedRoute>
          }
        />

        {/* Grades */}
        <Route
          path="/my-grades"
          element={
            <ProtectedRoute>
              <MyGradesPage />
            </ProtectedRoute>
          }
        />

        {/* Teacher Management */}
        <Route
          path="/view-submissions"
          element={
            <ProtectedRoute>
              <ViewSubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grade-submission/:submissionId"
          element={
            <ProtectedRoute>
              <GradeSubmissionPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Management */}
        <Route
          path="/manage-courses"
          element={
            <ProtectedRoute>
              <ManageCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-assignments"
          element={
            <ProtectedRoute>
              <ManageAssignmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute>
              <ManageUsersPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
