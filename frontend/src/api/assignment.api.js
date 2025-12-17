// Topshiriqlar API funksiyalari
import { get, post, put, del } from './client';

// Kurs topshiriqlarini olish
export const getCourseAssignments = (courseId) =>
  get(`/assignments/course/${courseId}`);

// Bitta topshiriqni olish
export const getAssignment = (id) => get(`/assignments/${id}`);

// Yangi topshiriq yaratish
export const createAssignment = (data) => post('/assignments/', data);

// Topshiriqni yangilash
export const updateAssignment = (id, data) => put(`/assignments/${id}`, data);

// Topshiriqni o'chirish
export const deleteAssignment = (id) => del(`/assignments/${id}`);

// Barcha topshiriqlar (admin/teacher uchun)
export const getAllAssignments = () => get('/assignments/');

