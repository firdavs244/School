// API Configuration
// Codespaces va lokal muhit uchun avtomatik ishlaydi
// API_URL client.js dan olinadi (codespaces avtomatik aniqlash bilan)

export { API_URL } from '../api/client';

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
