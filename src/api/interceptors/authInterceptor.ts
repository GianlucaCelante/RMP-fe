// src/api/interceptors/authInterceptor.ts

import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { tokenRefreshQueue } from '../utils/TokenRefreshQueue';

/**
 * Setup authentication interceptors for axios instance
 * Handles:
 * - Adding JWT token to outgoing requests
 * - Automatic token refresh on 401 errors
 * - Request retry after successful refresh
 * 
 * @param axiosInstance - The axios instance to attach interceptors to
 */
export const setupAuthInterceptors = (axiosInstance: AxiosInstance) => {
  /**
   * REQUEST INTERCEPTOR
   * Add Authorization header with JWT token to every request
   */
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * RESPONSE INTERCEPTOR
   * Handle 401 errors with automatic token refresh and request retry
   */
  axiosInstance.interceptors.response.use(
    // Success response - pass through
    (response) => response,
    
    // Error response - handle 401 with token refresh
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Check if error is 401 and we haven't retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('🔒 Received 401 - Token expired or invalid');

        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;

        try {
          // Use the queue to get a fresh token
          // If multiple requests fail simultaneously, only one refresh will be triggered
          const newAccessToken = await tokenRefreshQueue.refreshToken();

          console.log('🔓 Token refreshed, retrying original request...');

          // Update the original request's Authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          // Retry the original request with the new token
          return axiosInstance.request(originalRequest);
        } catch (refreshError) {
          console.error('💥 Token refresh failed, user will be redirected to login');
          
          // tokenRefreshQueue already handles logout and redirect
          // Just reject the promise
          return Promise.reject(refreshError);
        }
      }

      // For all other errors or if retry already attempted, reject
      return Promise.reject(error);
    }
  );
};