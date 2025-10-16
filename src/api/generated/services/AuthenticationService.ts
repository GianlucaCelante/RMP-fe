/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { LoginResponse } from '../models/LoginResponse';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { RefreshTokenResponse } from '../models/RefreshTokenResponse';
import type { UserInfoResponse } from '../models/UserInfoResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Refresh access token
     * Get new access token using refresh token. Implements token rotation - returns both new access and refresh tokens.
     * @param requestBody
     * @returns RefreshTokenResponse Token refreshed successfully
     * @throws ApiError
     */
    public static refreshToken(
        requestBody: RefreshTokenRequest,
    ): CancelablePromise<RefreshTokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
    /**
     * User logout
     * Logout current user and revoke refresh token. Requires valid access token.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static logout(
        requestBody: Record<string, string>,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized - Invalid or expired token`,
            },
        });
    }
    /**
     * User login
     * Authenticate user with username and password. Returns access token and refresh token.
     * @param requestBody
     * @returns LoginResponse Login successful
     * @throws ApiError
     */
    public static login(
        requestBody: LoginRequest,
    ): CancelablePromise<LoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
                423: `Account locked`,
            },
        });
    }
    /**
     * Get current user info
     * Get information about the currently authenticated user. Requires valid access token.
     * @returns UserInfoResponse User info retrieved successfully
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<UserInfoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/user-info',
            errors: {
                401: `Unauthorized - Invalid or expired token`,
            },
        });
    }
    /**
     * Health check
     * Simple endpoint to check if authentication service is running
     * @returns string Service is healthy
     * @throws ApiError
     */
    public static health(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/health',
        });
    }
}
