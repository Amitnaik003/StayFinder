import axios from 'axios';

// Use Vite env (import.meta.env). Fallback to localhost if not set.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach token from localStorage if present
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
