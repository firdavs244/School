// Yordamchi funksiyalar

// Sanani formatlash
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Qisqa sana formati
export const formatDateShort = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('uz-UZ');
};

// Vaqt bilan sana
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('uz-UZ');
};

// Muddat tugaganmi tekshirish
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

// Muddatgacha qolgan kunlar
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  return days;
};

// Matnni qisqartirish
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Baho rangini olish
export const getGradeColor = (score) => {
  if (score >= 90) return '#52c41a'; // Yashil - A'lo
  if (score >= 70) return '#1890ff'; // Ko'k - Yaxshi
  if (score >= 50) return '#faad14'; // Sariq - Qoniqarli
  return '#ff4d4f'; // Qizil - Yomon
};

// Rol rangini olish
export const getRoleColor = (role) => {
  const colors = {
    admin: 'red',
    teacher: 'green',
    student: 'blue',
  };
  return colors[role] || 'blue';
};

// Rol nomini olish
export const getRoleLabel = (role) => {
  const labels = {
    admin: 'Administrator',
    teacher: "O'qituvchi",
    student: "O'quvchi",
  };
  return labels[role] || role;
};

