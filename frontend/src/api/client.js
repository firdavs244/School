// API Client - Barcha so'rovlar uchun asosiy funksiyalar

// API manzilini aniqlash
// 1. Codespaces avtomatik aniqlash (BIRINCHI - eng muhim)
// 2. Environment variable (VITE_API_URL) - faqat to'ldirilgan bo'lsa
// 3. Default localhost
const getApiUrl = () => {
  // BIRINCHI: Codespaces avtomatik aniqlash
  // Bu eng ishonchli usul - brauzer hostname'dan aniqlaydi
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // GitHub Codespaces formatlarini tekshirish
    if (hostname.includes('.app.github.dev') || hostname.includes('.github.dev')) {
      // Portni 8000 ga almashtirish (5173, 3000, va boshqa portlar uchun)
      const backendHostname = hostname.replace(/-\d+\./, '-8000.');
      console.log('[API] Codespaces aniqlandi, backend URL:', `https://${backendHostname}`);
      return `https://${backendHostname}`;
    }
  }

  // IKKINCHI: Vite environment variable (faqat localhost bo'lmasa)
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '' && !envUrl.includes('localhost')) {
    console.log('[API] Environment variable ishlatilmoqda:', envUrl);
    return envUrl;
  }

  // DEFAULT: Localhost (mahalliy development uchun)
  console.log('[API] Default localhost ishlatilmoqda');
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

