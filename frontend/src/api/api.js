const BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (name, phone) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone })
  });
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

export const getSubCategories = async (categoryId) => {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}/sub-categories`);
  return res.json();
};

export const generateLesson = async (userId, categoryId, subCategoryId) => {
  const res = await fetch(`${BASE_URL}/learning/generate-lesson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, categoryId, subCategoryId })
  });
  return res.json();
};

export const getHistory = async (userId) => {
  const res = await fetch(`${BASE_URL}/learning/history/${userId}`);
  return res.json();
};

export const getAdminUsers = async () => {
  const res = await fetch(`${BASE_URL}/admin/users`);
  return res.json();
};
