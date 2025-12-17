// Yuborishlar (Submission) API funksiyalari
import { get, post } from './client';

// Topshiriq yuborish
export const submitAssignment = (data) => post('/submissions/', data);

// Mening yuborishlarim
export const getMySubmissions = () => get('/submissions/my-submissions');

// Topshiriq bo'yicha yuborishlar (teacher uchun)
export const getAssignmentSubmissions = (assignmentId) =>
  get(`/submissions/assignment/${assignmentId}`);

// Bitta yuborishni olish
export const getSubmission = (id) => get(`/submissions/${id}`);

