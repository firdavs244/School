// Loyiha bo'ylab ishlatiladigan konstantalar

// Foydalanuvchi rollari
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

// Rol ranglari
export const ROLE_COLORS = {
  admin: '#ff4d4f',
  teacher: '#52c41a',
  student: '#1890ff',
};

// Rol nomlari
export const ROLE_LABELS = {
  admin: 'Administrator',
  teacher: "O'qituvchi",
  student: "O'quvchi",
};

// Baho darajalari
export const GRADE_LEVELS = {
  EXCELLENT: { min: 90, label: "A'lo", color: '#52c41a' },
  GOOD: { min: 70, label: 'Yaxshi', color: '#1890ff' },
  SATISFACTORY: { min: 50, label: 'Qoniqarli', color: '#faad14' },
  POOR: { min: 0, label: 'Qoniqarsiz', color: '#ff4d4f' },
};

// Topshiriq holatlari
export const ASSIGNMENT_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  OVERDUE: 'overdue',
};

// Sahifa nomlari
export const PAGE_TITLES = {
  HOME: 'Bosh Sahifa',
  LOGIN: 'Kirish',
  REGISTER: "Ro'yxatdan O'tish",
  DASHBOARD: 'Boshqaruv Paneli',
  COURSES: 'Kurslar',
  ASSIGNMENTS: 'Topshiriqlar',
  GRADES: 'Baholar',
  SUBMISSIONS: 'Yuborishlar',
};

// Navigatsiya elementlari
export const NAV_ITEMS = {
  STUDENT: [
    { key: 'dashboard', label: 'Boshqaruv', path: '/dashboard' },
    { key: 'courses', label: 'Kurslar', path: '/browse-courses' },
    { key: 'assignments', label: 'Topshiriqlar', path: '/my-assignments' },
    { key: 'grades', label: 'Baholar', path: '/my-grades' },
  ],
  TEACHER: [
    { key: 'dashboard', label: 'Boshqaruv', path: '/dashboard' },
    { key: 'courses', label: 'Kurslar', path: '/browse-courses' },
    { key: 'create-course', label: 'Kurs Yaratish', path: '/create-course' },
    { key: 'create-assignment', label: 'Topshiriq Yaratish', path: '/create-assignment' },
    { key: 'submissions', label: 'Yuborishlar', path: '/view-submissions' },
  ],
  ADMIN: [
    { key: 'dashboard', label: 'Boshqaruv', path: '/dashboard' },
    { key: 'users', label: 'Foydalanuvchilar', path: '/manage-users' },
    { key: 'courses', label: 'Kurslar', path: '/manage-courses' },
    { key: 'assignments', label: 'Topshiriqlar', path: '/manage-assignments' },
  ],
};
// Autentifikatsiya uchun custom hook
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, removeToken, isAuthenticated } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student',
    logout,
    refetch,
  };
};

export default useAuth;

