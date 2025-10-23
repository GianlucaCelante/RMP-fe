// src/api/api-client.ts

import { OpenAPI } from './generated';
import { axiosInstance } from './axios-instance';

/**
 * Configure OpenAPI client to use our custom axios instance
 * This ensures all generated API services use our interceptors
 */

// Set base URL from environment
OpenAPI.BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/tenancy';

// Disable default credentials (we handle auth via interceptors)
OpenAPI.WITH_CREDENTIALS = false;

// Token provider for OpenAPI client
// Returns current access token from localStorage
OpenAPI.TOKEN = async () => {
  return localStorage.getItem('accessToken') || '';
};

/**
 * Note: The generated API services will use the global OpenAPI config
 * and our axios instance with all interceptors automatically
 */

export { axiosInstance };
export default axiosInstance;