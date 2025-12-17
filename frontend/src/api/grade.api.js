// Baholar API funksiyalari
import { get, post, put } from './client';

// Mening baholarim
export const getMyGrades = () => get('/grades/my-grades');

// Baho qo'yish
export const createGrade = (data) => post('/grades/', data);

// Bahoni yangilash
export const updateGrade = (id, data) => put(`/grades/${id}`, data);

// Submission bo'yicha baho olish
export const getSubmissionGrade = (submissionId) =>
  get(`/grades/submission/${submissionId}`);

