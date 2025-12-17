// Ro'yxatga olish (Enrollment) API funksiyalari
import { get, post, del } from './client';

// Kursga yozilish
export const enrollInCourse = (studentId, courseId) =>
  post('/enrollments/', { student_id: studentId, course_id: courseId });

// Mening kurslarim
export const getMyCourses = () => get('/enrollments/my-courses');

// Kursdan chiqish
export const unenrollFromCourse = (enrollmentId) =>
  del(`/enrollments/${enrollmentId}`);

