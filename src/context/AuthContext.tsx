// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthenticationService, tokenRefreshQueue, UserInfo } from '../api';

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

  /**
   * Load user info on mount if token exists
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          await refreshUserInfo();
        } catch (error) {
          console.error('Failed to load user info on init:', error);
          // Token invalid, clear it (interceptor handles redirect)
          tokenRefreshQueue.logout();
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   * Tokens are automatically saved by the response
   */
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await AuthenticationService.login({
        username,
        password,
      });

      // Save tokens (backend returns them)
      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      }

      // Save user info to state
      if (response.user) {
        setUser(response.user);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh user info from backend
   * Useful after login or when user data might have changed
   */
  const refreshUserInfo = async () => {
    try {
      const userInfo = await AuthenticationService.getCurrentUser();
      setUser(userInfo || null);
    } catch (error) {
      console.error('Failed to refresh user info:', error);
      throw error;
    }
  };

  /**
   * Logout user
   * Calls backend to revoke refresh token, then clears local state
   */
  const logout = async () => {
    setLoading(true);
    try {
      // Try to revoke refresh token on backend
      await AuthenticationService.logout({});
    } catch (error) {
      console.error('Backend logout failed (continuing anyway):', error);
    } finally {
      // Always clear tokens and state (even if backend call fails)
      tokenRefreshQueue.logout();
      setUser(null);
      setLoading(false);
      
      // Redirect to login
      window.location.href = '/login';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Helper hook to check if user has required role
 */
export const useRequireRole = (requiredRole: 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT'): boolean => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  // Role hierarchy: SUPER_ADMIN > ADMIN > SUPPORT
  const roleHierarchy = {
    SUPER_ADMIN: 3,
    ADMIN: 2,
    SUPPORT: 1,
    VIEWER: 0,
  };
  
  const userRoleLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole];
  
  return userRoleLevel >= requiredRoleLevel;
};