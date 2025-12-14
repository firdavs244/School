export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// User APIs
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to register user');
  }
  return res.json();
}

export async function loginUser(username, password) {
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
    throw new Error(error.detail || 'Failed to login');
  }
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get current user');
  }
  return res.json();
}

// Course APIs
export async function getCourses() {
  const res = await fetch(`${API_URL}/courses/`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get courses');
  }
  return res.json();
}

export async function getCourse(id) {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get course');
  }
  return res.json();
}

export async function createCourse(data) {
  const res = await fetch(`${API_URL}/courses/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to create course');
  }
  return res.json();
}

// Enrollment APIs
export async function enrollInCourse(studentId, courseId) {
  const res = await fetch(`${API_URL}/enrollments/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ student_id: studentId, course_id: courseId }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to enroll');
  }
  return res.json();
}

export async function getMyCourses() {
  const res = await fetch(`${API_URL}/enrollments/my-courses`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get enrolled courses');
  }
  return res.json();
}

// Assignment APIs
export async function getCourseAssignments(courseId) {
  const res = await fetch(`${API_URL}/assignments/course/${courseId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get assignments');
  }
  return res.json();
}

export async function createAssignment(data) {
  const res = await fetch(`${API_URL}/assignments/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to create assignment');
  }
  return res.json();
}

// Submission APIs
export async function submitAssignment(data) {
  const res = await fetch(`${API_URL}/submissions/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to submit assignment');
  }
  return res.json();
}

export async function getMySubmissions() {
  const res = await fetch(`${API_URL}/submissions/my-submissions`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get submissions');
  }
  return res.json();
}

// Grade APIs
export async function getMyGrades() {
  const res = await fetch(`${API_URL}/grades/my-grades`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to get grades');
  }
  return res.json();
}

export async function createGrade(data) {
  const res = await fetch(`${API_URL}/grades/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Failed to create grade');
  }
  return res.json();
}
