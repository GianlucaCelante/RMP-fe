/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserInfo } from './UserInfo';
/**
 * Login response with tokens and user info
 */
export type LoginResponse = {
    /**
     * JWT access token
     */
    accessToken?: string;
    /**
     * JWT refresh token
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
    /**
     * User information
     */
    user?: UserInfo;
};

