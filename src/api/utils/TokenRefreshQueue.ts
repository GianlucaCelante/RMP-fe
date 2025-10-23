// src/api/utils/TokenRefreshQueue.ts

import axios from 'axios';

/**
 * Singleton class to manage token refresh queue
 * Prevents multiple simultaneous refresh requests (thundering herd problem)
 */
class TokenRefreshQueue {
  private static instance: TokenRefreshQueue;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<string> | null = null;

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): TokenRefreshQueue {
    if (!TokenRefreshQueue.instance) {
      TokenRefreshQueue.instance = new TokenRefreshQueue();
    }
    return TokenRefreshQueue.instance;
  }

  /**
   * Refresh access token using refresh token
   * If a refresh is already in progress, returns the existing promise
   * 
   * @returns Promise<string> - New access token
   * @throws Error if refresh fails
   */
  public async refreshToken(): Promise<string> {
    // If refresh is already in progress, wait for it
    if (this.isRefreshing && this.refreshPromise) {
      console.log('⏳ Token refresh already in progress, waiting...');
      return this.refreshPromise;
    }

    // Start new refresh process
    console.log('🔄 Starting token refresh...');
    this.isRefreshing = true;
    this.refreshPromise = this.doRefresh();

    try {
      const newAccessToken = await this.refreshPromise;
      console.log('✅ Token refresh successful');
      return newAccessToken;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      throw error;
    } finally {
      // Reset state
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Internal method to perform the actual refresh request
   * Uses a separate axios instance to avoid interceptor loops
   */
  private async doRefresh(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/tenancy';

    try {
      // Use a separate axios instance to avoid interceptor loops
      const response = await axios.post(
        `${baseURL}/api/v1/auth/refresh`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      if (!accessToken || !newRefreshToken) {
        throw new Error('Invalid refresh response: missing tokens');
      }

      // ⚠️ CRITICAL: Backend implements token rotation
      // Both access token AND refresh token must be updated
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      console.log('💾 New tokens saved to localStorage');

      return accessToken;
    } catch (error: any) {
      console.error('🚨 Refresh token request failed:', error.response?.data || error.message);

      // Clear tokens on refresh failure
      this.clearTokens();

      // Redirect to login
      window.location.href = '/login';

      throw error;
    }
  }

  /**
   * Clear all tokens from localStorage
   */
  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('🗑️ Tokens cleared from localStorage');
  }

  /**
   * Check if a refresh is currently in progress
   */
  public isRefreshInProgress(): boolean {
    return this.isRefreshing;
  }

  /**
   * Manually trigger logout (clear tokens without refresh)
   */
  public logout(): void {
    this.clearTokens();
    this.isRefreshing = false;
    this.refreshPromise = null;
  }
}

// Export singleton instance
export const tokenRefreshQueue = TokenRefreshQueue.getInstance();