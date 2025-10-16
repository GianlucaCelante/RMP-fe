/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Refresh token response with new tokens
 */
export type RefreshTokenResponse = {
    /**
     * New JWT access token
     */
    accessToken?: string;
    /**
     * New JWT refresh token (rotation)
     */
    refreshToken?: string;
    /**
     * Token type
     */
    tokenType?: string;
    /**
     * Access token expiration time in seconds
     */
    expiresIn?: number;
};

