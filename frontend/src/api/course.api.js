// Kurslar API funksiyalari
import { get, post, put, del } from './client';

// Barcha kurslarni olish
export const getCourses = () => get('/courses/');

// Bitta kursni olish
export const getCourse = (id) => get(`/courses/${id}`);

// Yangi kurs yaratish
export const createCourse = (data) => post('/courses/', data);

// Kursni yangilash
export const updateCourse = (id, data) => put(`/courses/${id}`, data);

// Kursni o'chirish
export const deleteCourse = (id) => del(`/courses/${id}`);

