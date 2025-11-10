import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts'; // backend URL

export const getBugs = () => axios.get(API_URL);

export const createBug = (bug, token) =>
  axios.post(API_URL, bug, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBug = (id, updates, token) =>
  axios.put(`${API_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBug = (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
