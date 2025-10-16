/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSubscriptionPlanRequest } from '../models/CreateSubscriptionPlanRequest';
import type { SubscriptionPlanListResponse } from '../models/SubscriptionPlanListResponse';
import type { SubscriptionPlanResponse } from '../models/SubscriptionPlanResponse';
import type { UpdateSubscriptionPlanRequest } from '../models/UpdateSubscriptionPlanRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionPlansService {
    /**
     * Get subscription plan by ID
     * Retrieve detailed information about a specific subscription plan by its unique identifier. Requires SUPER_ADMIN or ADMIN role.
     * @param id Subscription plan unique identifier (UUID)
     * @returns SubscriptionPlanResponse Successfully retrieved subscription plan
     * @throws ApiError
     */
    public static getPlanById(
        id: string,
    ): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscription-plans/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Subscription plan not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update subscription plan information
     * Update editable information of an existing subscription plan. Note: Code cannot be updated through this endpoint. Requires SUPER_ADMIN or ADMIN role.
     * @param id Subscription plan unique identifier (UUID)
     * @param requestBody Subscription plan update request with fields to be updated
     * @returns SubscriptionPlanResponse Subscription plan updated successfully
     * @throws ApiError
     */
    public static updatePlan(
        id: string,
        requestBody: UpdateSubscriptionPlanRequest,
    ): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/subscription-plans/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Subscription plan not found with the specified ID`,
                500: `Internal server error - Failed to update subscription plan`,
            },
        });
    }
    /**
     * Delete subscription plan
     * Permanently delete a subscription plan. This operation is irreversible. Requires SUPER_ADMIN role.
     * @param id Subscription plan unique identifier (UUID)
     * @returns void
     * @throws ApiError
     */
    public static deletePlan(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/subscription-plans/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription plan not found with the specified ID`,
                500: `Internal server error - Failed to delete subscription plan`,
            },
        });
    }
    /**
     * Get all subscription plans
     * Retrieve a paginated list of all subscription plans in the platform. Requires SUPER_ADMIN or ADMIN role.
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @returns SubscriptionPlanListResponse Successfully retrieved subscription plan list
     * @throws ApiError
     */
    public static getAllPlans(
        page?: number,
        size: number = 20,
        sort: string = 'sortOrder',
        direction: 'ASC' | 'DESC' = 'ASC',
    ): CancelablePromise<SubscriptionPlanListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscription-plans',
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
     * Create new subscription plan
     * Create a new subscription plan with all details. This operation requires SUPER_ADMIN role.
     * @param requestBody Subscription plan creation request with all required information
     * @returns SubscriptionPlanResponse Subscription plan created successfully
     * @throws ApiError
     */
    public static createPlan(
        requestBody: CreateSubscriptionPlanRequest,
    ): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/subscription-plans',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                409: `Conflict - Plan with the same code already exists`,
                500: `Internal server error - Failed to create subscription plan`,
            },
        });
    }
    /**
     * Deactivate subscription plan
     * Make a subscription plan inactive and unavailable for selection. Requires SUPER_ADMIN role.
     * @param id Subscription plan unique identifier (UUID)
     * @returns SubscriptionPlanResponse Subscription plan deactivated successfully
     * @throws ApiError
     */
    public static deactivatePlan(
        id: string,
    ): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscription-plans/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription plan not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Activate subscription plan
     * Make a subscription plan active and available for selection. Requires SUPER_ADMIN role.
     * @param id Subscription plan unique identifier (UUID)
     * @returns SubscriptionPlanResponse Subscription plan activated successfully
     * @throws ApiError
     */
    public static activatePlan(
        id: string,
    ): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscription-plans/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription plan not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all active subscription plans
     * Retrieve a list of all active and visible subscription plans. No authentication required for public access.
     * @returns SubscriptionPlanResponse Successfully retrieved active subscription plans
     * @throws ApiError
     */
    public static getActivePlans(): CancelablePromise<SubscriptionPlanResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscription-plans/active',
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
