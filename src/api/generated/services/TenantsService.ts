/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTenantRequest } from '../models/CreateTenantRequest';
import type { TenantListResponse } from '../models/TenantListResponse';
import type { TenantResponse } from '../models/TenantResponse';
import type { UpdateTenantRequest } from '../models/UpdateTenantRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantsService {
    /**
     * Get tenant by ID
     * Retrieve detailed information about a specific tenant by its unique identifier. Requires SUPER_ADMIN or ADMIN role.
     * @param id Tenant unique identifier (UUID)
     * @returns TenantResponse Successfully retrieved tenant
     * @throws ApiError
     */
    public static getTenantById(
        id: string,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tenants/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Tenant not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update tenant information
     * Update editable information of an existing tenant. Note: Code, schema name, and status cannot be updated through this endpoint. Requires SUPER_ADMIN or ADMIN role.
     * @param id Tenant unique identifier (UUID)
     * @param requestBody Tenant update request with fields to be updated (only provided fields will be updated)
     * @returns TenantResponse Tenant updated successfully
     * @throws ApiError
     */
    public static updateTenant(
        id: string,
        requestBody: UpdateTenantRequest,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/tenants/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Tenant not found with the specified ID`,
                409: `Conflict - Email, VAT number, or fiscal code already exists for another tenant`,
                500: `Internal server error - Failed to update tenant`,
            },
        });
    }
    /**
     * Cancel tenant
     * Permanently cancel a tenant subscription. This is irreversible. Requires SUPER_ADMIN role.
     * @param id Tenant unique identifier (UUID)
     * @param reason Reason for cancellation
     * @returns TenantResponse Tenant cancelled successfully
     * @throws ApiError
     */
    public static cancelTenant(
        id: string,
        reason: string,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/tenants/{id}',
            path: {
                'id': id,
            },
            query: {
                'reason': reason,
            },
            errors: {
                400: `Invalid request - Tenant cannot be cancelled`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Tenant not found with the specified ID`,
                500: `Internal server error - Failed to cancel tenant`,
            },
        });
    }
    /**
     * Get all tenants
     * Retrieve a paginated list of all tenants in the platform. Requires SUPER_ADMIN or ADMIN role.
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @returns TenantListResponse Successfully retrieved tenant list
     * @throws ApiError
     */
    public static getAllTenants(
        page?: number,
        size: number = 20,
        sort: string = 'createdAt',
        direction: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<TenantListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tenants',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'direction': direction,
            },
            errors: {
                400: `Invalid pagination parameters`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create new tenant
     * Create a new tenant with initial subscription and database schema. This operation will: (1) Create tenant record, (2) Create subscription, (3) Create dedicated database schema, (4) Initialize schema with tables. Requires SUPER_ADMIN role.
     * @param requestBody Tenant creation request with all required information
     * @returns TenantResponse Tenant created successfully with subscription and schema
     * @throws ApiError
     */
    public static createTenant(
        requestBody: CreateTenantRequest,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/tenants',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                409: `Conflict - Tenant with the same code, email, VAT number, or fiscal code already exists`,
                500: `Internal server error - Failed to create tenant, subscription, or database schema`,
            },
        });
    }
    /**
     * Suspend tenant
     * Change tenant status from ACTIVE to SUSPENDED. This temporarily disables tenant access. Requires SUPER_ADMIN or ADMIN role.
     * @param id Tenant unique identifier (UUID)
     * @param requestBody
     * @returns TenantResponse Tenant suspended successfully
     * @throws ApiError
     */
    public static suspendTenant(
        id: string,
        requestBody: string,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/tenants/{id}/suspend',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request - Tenant cannot be suspended (e.g., not active)`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Tenant not found with the specified ID`,
                500: `Internal server error - Failed to suspend tenant`,
            },
        });
    }
    /**
     * Activate tenant
     * Change tenant status from PENDING to ACTIVE. This makes the tenant operational. Requires SUPER_ADMIN role.
     * @param id Tenant unique identifier (UUID)
     * @returns TenantResponse Tenant activated successfully
     * @throws ApiError
     */
    public static activateTenant(
        id: string,
    ): CancelablePromise<TenantResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/tenants/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid request - Tenant cannot be activated (e.g., already active or cancelled)`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Tenant not found with the specified ID`,
                500: `Internal server error - Failed to activate tenant`,
            },
        });
    }
}
