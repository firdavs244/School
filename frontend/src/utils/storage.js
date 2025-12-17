// Storage bilan ishlash funksiyalari

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'user_id',
  THEME: 'theme',
};

// Tokenni saqlash
export const saveToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Tokenni olish
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Tokenni o'chirish
export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// User ID saqlash
export const saveUserId = (userId) => {
  localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
};

// User ID olish
export const getUserId = () => {
  return localStorage.getItem(STORAGE_KEYS.USER_ID);
};

// User ID o'chirish
export const removeUserId = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
};

// Barcha saqlangan ma'lumotlarni tozalash
export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
};

export default STORAGE_KEYS;

