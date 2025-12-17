// Autentifikatsiya API funksiyalari
import { API_URL, getAuthHeaders } from './client';

// Ro'yxatdan o'tish
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Ro\'yxatdan o\'tishda xatolik');
  }
  return res.json();
};

// Tizimga kirish
export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Kirish xatolik');
  }
  return res.json();
};

// Joriy foydalanuvchi ma'lumotlari
export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error('Foydalanuvchi ma\'lumotlarini olishda xatolik');
  }
  return res.json();
};

// Tokenni saqlash
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Tokenni olish
export const getToken = () => {
  return localStorage.getItem('token');
};

// Tokenni o'chirish (chiqish)
export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
};

// Foydalanuvchi tizimda bormi tekshirish
export const isAuthenticated = () => {
  return !!getToken();
};

