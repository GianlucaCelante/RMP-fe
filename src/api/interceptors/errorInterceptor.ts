// src/api/interceptors/errorInterceptor.ts

import { AxiosError, AxiosInstance } from 'axios';
import { message } from 'antd';

/**
 * Error response structure from backend
 */
interface ErrorResponse {
  message?: string;
  error?: string;
  status?: number;
  timestamp?: string;
  path?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Setup global error handling interceptor for axios instance
 * Displays user-friendly error messages using Ant Design message component
 * 
 * @param axiosInstance - The axios instance to attach interceptors to
 */
export const setupErrorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    // Success response - pass through
    (response) => response,
    
    // Error response - handle globally
    (error: AxiosError<ErrorResponse>) => {
      // Don't show errors for auth endpoints (handled by authInterceptor)
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      
      if (isAuthEndpoint && error.response?.status === 401) {
        // 401 on auth endpoints is handled by authInterceptor
        return Promise.reject(error);
      }

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        handleHttpError(error);
      } else if (error.request) {
        // Request made but no response received
        handleNetworkError(error);
      } else {
        // Something else happened
        handleUnknownError(error);
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Handle HTTP errors (4xx, 5xx)
 */
const handleHttpError = (error: AxiosError<ErrorResponse>) => {
  const status = error.response?.status;
  const errorData = error.response?.data;
  const errorMessage = errorData?.message || errorData?.error || 'Si è verificato un errore';

  switch (status) {
    case 400:
      // Bad Request - Validation errors
      if (errorData?.errors && errorData.errors.length > 0) {
        // Multiple validation errors
        const firstError = errorData.errors[0];
        message.error(`❌ ${firstError.field}: ${firstError.message}`);
      } else {
        message.error(`❌ Richiesta non valida: ${errorMessage}`);
      }
      break;

    case 401:
      // Unauthorized - Should be handled by authInterceptor
      // This is a fallback for non-auth endpoints
      message.error('🔒 Sessione scaduta. Effettua nuovamente il login.');
      break;

    case 403:
      // Forbidden - Access denied
      message.error('🚫 Accesso negato. Non hai i permessi necessari per questa operazione.');
      break;

    case 404:
      // Not Found
      message.warning('🔍 Risorsa non trovata.');
      break;

    case 409:
      // Conflict - Resource already exists or conflict state
      message.error(`⚠️ Conflitto: ${errorMessage}`);
      break;

    case 422:
      // Unprocessable Entity - Semantic errors
      message.error(`❌ Dati non elaborabili: ${errorMessage}`);
      break;

    case 429:
      // Too Many Requests - Rate limiting
      message.warning('⏱️ Troppe richieste. Riprova tra qualche momento.');
      break;

    case 500:
      // Internal Server Error
      message.error('⚠️ Errore interno del server. Riprova più tardi.');
      console.error('Server error:', errorData);
      break;

    case 502:
      // Bad Gateway
      message.error('🔌 Gateway non disponibile. Riprova più tardi.');
      break;

    case 503:
      // Service Unavailable
      message.error('🔧 Servizio temporaneamente non disponibile. Riprova tra qualche minuto.');
      break;

    case 504:
      // Gateway Timeout
      message.error('⏱️ Timeout della richiesta. Il server impiega troppo tempo a rispondere.');
      break;

    default:
      // Generic error for other status codes
      if (status && status >= 500) {
        message.error('⚠️ Errore del server. Contatta il supporto se il problema persiste.');
      } else {
        message.error(`❌ Errore ${status}: ${errorMessage}`);
      }
  }
};

/**
 * Handle network errors (timeout, no connection, etc.)
 */
const handleNetworkError = (error: AxiosError) => {
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    // Timeout error
    message.error('⏱️ Timeout della richiesta. Verifica la tua connessione.');
  } else if (error.code === 'ERR_NETWORK' || !navigator.onLine) {
    // Network error or offline
    message.error('📡 Connessione persa. Verifica la tua rete e riprova.');
  } else {
    // Generic network error
    message.error('🌐 Errore di rete. Impossibile raggiungere il server.');
  }
  
  console.error('Network error:', error.message);
};

/**
 * Handle unknown errors
 */
const handleUnknownError = (error: AxiosError) => {
  message.error('❌ Si è verificato un errore imprevisto.');
  console.error('Unknown error:', error);
};

/**
 * Utility to check if error should be handled locally
 * Use this in components to skip global error handling
 * 
 * @example
 * try {
 *   await api.call();
 * } catch (error) {
 *   if (shouldHandleLocally(error, 404)) {
 *     // Custom 404 handling
 *   }
 * }
 */
export const shouldHandleLocally = (error: any, status: number): boolean => {
  return error?.response?.status === status;
};

/**
 * Utility to suppress global error handling for specific requests
 * Add this config to axios request to prevent global error toast
 * 
 * @example
 * axiosInstance.get('/api/tenants', { 
 *   ...suppressGlobalError() 
 * });
 */
export const suppressGlobalError = () => ({
  _suppressGlobalError: true,
});