// src/api/index.ts

/**
 * Central export point for API layer
 * Import everything you need from here
 */

// Axios instance
export { axiosInstance } from './axios-instance';

// Generated API Services
export {
  AuthenticationService,
  TenantsService,
  SubscriptionsService,
  SubscriptionPlansService,
  BillingInvoicesService,
  ActuatorService,
} from './generated';

// Generated Types
export type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserInfo,
  TenantResponse,
  TenantListResponse,
  CreateTenantRequest,
  UpdateTenantRequest,
  SubscriptionResponse,
  SubscriptionListResponse,
  UpgradeSubscriptionRequest,
  CancelSubscriptionRequest,
  ChangeBillingCycleRequest,
  SubscriptionPlanResponse,
  SubscriptionPlanListResponse,
  CreateSubscriptionPlanRequest,
  UpdateSubscriptionPlanRequest,
  InvoiceResponse,
  InvoiceListResponse,
  MarkInvoiceAsPaidRequest,
  CancelInvoiceRequest,
  ErrorResponse,
} from './generated';

// Utilities
export { tokenRefreshQueue } from './utils/TokenRefreshQueue';
export { shouldHandleLocally, suppressGlobalError } from './interceptors/errorInterceptor';

// OpenAPI Config (for advanced usage)
export { OpenAPI } from './generated';