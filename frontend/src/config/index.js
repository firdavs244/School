// API Configuration
// Codespaces va lokal muhit uchun avtomatik ishlaydi

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,

  // Users
  USERS: `${API_URL}/users`,
  ME: `${API_URL}/users/me`,

  // Courses
  COURSES: `${API_URL}/courses`,

  // Assignments
  ASSIGNMENTS: `${API_URL}/assignments`,

  // Submissions
  SUBMISSIONS: `${API_URL}/submissions`,

  // Grades
  GRADES: `${API_URL}/grades`,

  // Enrollments
  ENROLLMENTS: `${API_URL}/enrollments`,
};

export default {
  API_URL,
  API_ENDPOINTS,
};
