// src/api/axios-instance.ts

import axios from 'axios';
import { setupAuthInterceptors } from './interceptors/authInterceptor';
import { setupErrorInterceptor } from './interceptors/errorInterceptor';

/**
 * Base URL from environment variables
 * Falls back to localhost if not set
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/tenancy';

/**
 * Axios instance with configured interceptors
 * - Authentication: Automatic token refresh on 401
 * - Error handling: Global error messages with Ant Design
 */
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Setup interceptors
 * Order matters: auth interceptor runs before error interceptor
 */
setupAuthInterceptors(axiosInstance);
setupErrorInterceptor(axiosInstance);

/**
 * Export configured instance as default
 */
export default axiosInstance;