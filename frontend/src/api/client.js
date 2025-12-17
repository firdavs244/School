// API Client - Barcha so'rovlar uchun asosiy funksiyalar

// API manzilini aniqlash
// 1. Environment variable (VITE_API_URL)
// 2. Window API_URL (runtime injection uchun)
// 3. Default localhost
const getApiUrl = () => {
  // Vite environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Runtime injection (Codespaces uchun)
  if (typeof window !== 'undefined' && window.API_URL) {
    return window.API_URL;
  }

  // Codespaces avtomatik aniqlash
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.dev')) {
    // Codespaces'da backend port 8000
    const hostname = window.location.hostname;
    // frontend-5173.app.github.dev -> backend-8000.app.github.dev
    const backendHostname = hostname.replace('-5173.', '-8000.');
    return `https://${backendHostname}`;
  }

  // Default localhost
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl();

// Token bilan header olish
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Umumiy fetch wrapper
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: getAuthHeaders(),
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
};

// GET so'rov
export const get = (endpoint) => apiRequest(endpoint);

// POST so'rov
export const post = (endpoint, data) =>
  apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// PUT so'rov
export const put = (endpoint, data) =>
  apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// DELETE so'rov
export const del = (endpoint) =>
  apiRequest(endpoint, {
    method: 'DELETE',
  });

