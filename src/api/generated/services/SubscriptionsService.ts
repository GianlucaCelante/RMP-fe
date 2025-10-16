/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelSubscriptionRequest } from '../models/CancelSubscriptionRequest';
import type { ChangeBillingCycleRequest } from '../models/ChangeBillingCycleRequest';
import type { SubscriptionListResponse } from '../models/SubscriptionListResponse';
import type { SubscriptionResponse } from '../models/SubscriptionResponse';
import type { UpgradeSubscriptionRequest } from '../models/UpgradeSubscriptionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionsService {
    /**
     * Upgrade subscription plan
     * Upgrade a subscription to a higher-tier plan. The change takes effect immediately and recalculates next payment amount. Requires SUPER_ADMIN role.
     * @param id Subscription unique identifier (UUID)
     * @param requestBody Upgrade subscription request with new plan code
     * @returns SubscriptionResponse Subscription upgraded successfully
     * @throws ApiError
     */
    public static upgradeSubscription(
        id: string,
        requestBody: UpgradeSubscriptionRequest,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscriptions/{id}/upgrade',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Plan not found or not available`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription not found with the specified ID`,
                500: `Internal server error - Failed to upgrade subscription`,
            },
        });
    }
    /**
     * Reactivate subscription
     * Reactivate a cancelled subscription. Only works for subscriptions that are cancelled or scheduled for cancellation. Requires SUPER_ADMIN role.
     * @param id Subscription unique identifier (UUID)
     * @returns SubscriptionResponse Subscription reactivated successfully
     * @throws ApiError
     */
    public static reactivateSubscription(
        id: string,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscriptions/{id}/reactivate',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid operation - Subscription is not cancelled`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription not found with the specified ID`,
                500: `Internal server error - Failed to reactivate subscription`,
            },
        });
    }
    /**
     * Change billing cycle
     * Change the billing cycle of a subscription between MONTHLY and YEARLY. The change takes effect on the next billing period. Requires SUPER_ADMIN role.
     * @param id Subscription unique identifier (UUID)
     * @param requestBody Change billing cycle request with new cycle
     * @returns SubscriptionResponse Billing cycle changed successfully
     * @throws ApiError
     */
    public static changeBillingCycle(
        id: string,
        requestBody: ChangeBillingCycleRequest,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscriptions/{id}/change-billing-cycle',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Same billing cycle or validation errors`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription not found with the specified ID`,
                500: `Internal server error - Failed to change billing cycle`,
            },
        });
    }
    /**
     * Cancel subscription
     * Cancel a subscription either immediately or at the end of the current billing period. Requires SUPER_ADMIN role.
     * @param id Subscription unique identifier (UUID)
     * @param requestBody Cancellation request with reason and immediate flag
     * @returns SubscriptionResponse Subscription cancelled successfully
     * @throws ApiError
     */
    public static cancelSubscription(
        id: string,
        requestBody: CancelSubscriptionRequest,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/subscriptions/{id}/cancel',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Subscription not found with the specified ID`,
                500: `Internal server error - Failed to cancel subscription`,
            },
        });
    }
    /**
     * Get all subscriptions
     * Retrieve a paginated list of all subscriptions in the platform. Requires SUPER_ADMIN or ADMIN role.
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @returns SubscriptionListResponse Successfully retrieved subscription list
     * @throws ApiError
     */
    public static getAllSubscriptions(
        page?: number,
        size: number = 20,
        sort: string = 'createdAt',
        direction: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<SubscriptionListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions',
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
     * Get subscription by ID
     * Retrieve detailed information about a specific subscription by its unique identifier. Requires SUPER_ADMIN or ADMIN role.
     * @param id Subscription unique identifier (UUID)
     * @returns SubscriptionResponse Successfully retrieved subscription
     * @throws ApiError
     */
    public static getSubscriptionById(
        id: string,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Subscription not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get subscription by tenant ID
     * Retrieve the subscription for a specific tenant. Requires SUPER_ADMIN or ADMIN role.
     * @param tenantId Tenant unique identifier (UUID)
     * @returns SubscriptionResponse Successfully retrieved subscription
     * @throws ApiError
     */
    public static getSubscriptionByTenantId(
        tenantId: string,
    ): CancelablePromise<SubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions/tenant/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Subscription not found for the specified tenant`,
                500: `Internal server error`,
            },
        });
    }
}
