import axios from 'axios';
import { getToken } from '../lib/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://eventify2-backend-2.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  console.log('🔑 Token from localStorage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header set');
  } else {
    console.log('❌ No token found in localStorage');
  }
  return config;
});

export default apiClient;
