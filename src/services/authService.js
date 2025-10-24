// src/services/authService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export async function signup({ username, fullName, password, confirmPassword }) {
  const resp = await axios.post(`${API_BASE}/auth/signup`, {
    username,
    fullName,
    password,
    confirmPassword,
  });
  return resp.data;
}

export async function login({ username, password }) {
  const resp = await axios.post(`${API_BASE}/auth/login`, {
    username,
    password,
  });
  return resp.data;
}
