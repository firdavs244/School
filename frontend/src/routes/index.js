// Barcha route konfiguratsiyalari
export { default as ProtectedRoute } from './ProtectedRoute';

// Route yo'llari
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',

  // Kurslar
  BROWSE_COURSES: '/browse-courses',
  CREATE_COURSE: '/create-course',

  // Topshiriqlar
  MY_ASSIGNMENTS: '/my-assignments',
  CREATE_ASSIGNMENT: '/create-assignment',
  SUBMIT_ASSIGNMENT: '/submit-assignment/:assignmentId',

  // Baholar
  MY_GRADES: '/my-grades',

  // O'qituvchi
  VIEW_SUBMISSIONS: '/view-submissions',
  GRADE_SUBMISSION: '/grade-submission/:submissionId',

  // Admin
  MANAGE_COURSES: '/manage-courses',
  MANAGE_ASSIGNMENTS: '/manage-assignments',
  MANAGE_USERS: '/manage-users',
};

// Dinamik URL yaratish
export const createRoute = {
  submitAssignment: (assignmentId) => `/submit-assignment/${assignmentId}`,
  gradeSubmission: (submissionId) => `/grade-submission/${submissionId}`,
};

