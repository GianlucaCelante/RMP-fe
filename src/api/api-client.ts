// src/api/api-client.ts
import { OpenAPI } from './generated';

// Configura il client generato per usare la nostra axios instance
OpenAPI.BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/tenancy';

// Usa la nostra axios instance custom
OpenAPI.WITH_CREDENTIALS = false;

// Interceptor per aggiungere token (già gestito da axios-instance)
OpenAPI.TOKEN = async () => {
  return localStorage.getItem('accessToken') || '';
};