// App.jsx - Yangilangan va toza versiya
import { Routes, Route } from 'react-router-dom';

// Layout komponentlar
import { Header, Footer } from './components';

// Route komponentlar
import { ProtectedRoute, ROUTES } from './routes';

// Sahifalar
import {
  HomePage,
  LoginPage,
  RegisterPage,
  Dashboard,
  BrowseCoursesPage,
  CreateCoursePage,
  MyAssignmentsPage,
  SubmitAssignmentPage,
  CreateAssignmentPage,
  MyGradesPage,
  ViewSubmissionsPage,
  GradeSubmissionPage,
  ManageCoursesPage,
  ManageAssignmentsPage,
  ManageUsersPage,
} from './pages';

// Stillar
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Routes>
          {/* Ommaviy sahifalar */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          {/* Himoyalangan sahifalar */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Kurslar */}
          <Route
            path={ROUTES.BROWSE_COURSES}
            element={
              <ProtectedRoute>
                <BrowseCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CREATE_COURSE}
            element={
              <ProtectedRoute>
                <CreateCoursePage />
              </ProtectedRoute>
            }
          />

          {/* Topshiriqlar */}
          <Route
            path={ROUTES.MY_ASSIGNMENTS}
            element={
              <ProtectedRoute>
                <MyAssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SUBMIT_ASSIGNMENT}
            element={
              <ProtectedRoute>
                <SubmitAssignmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CREATE_ASSIGNMENT}
            element={
              <ProtectedRoute>
                <CreateAssignmentPage />
              </ProtectedRoute>
            }
          />

          {/* Baholar */}
          <Route
            path={ROUTES.MY_GRADES}
            element={
              <ProtectedRoute>
                <MyGradesPage />
              </ProtectedRoute>
            }
          />

          {/* O'qituvchi uchun */}
          <Route
            path={ROUTES.VIEW_SUBMISSIONS}
            element={
              <ProtectedRoute>
                <ViewSubmissionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.GRADE_SUBMISSION}
            element={
              <ProtectedRoute>
                <GradeSubmissionPage />
              </ProtectedRoute>
            }
          />

          {/* Admin uchun */}
          <Route
            path={ROUTES.MANAGE_COURSES}
            element={
              <ProtectedRoute>
                <ManageCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MANAGE_ASSIGNMENTS}
            element={
              <ProtectedRoute>
                <ManageAssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MANAGE_USERS}
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
