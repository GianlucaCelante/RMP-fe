/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Current authenticated user information
 */
export type UserInfoResponse = {
    /**
     * User ID
     */
    id?: string;
    /**
     * Username
     */
    username?: string;
    /**
     * Email
     */
    email?: string;
    /**
     * First name
     */
    firstName?: string;
    /**
     * Last name
     */
    lastName?: string;
    /**
     * User role
     */
    role?: UserInfoResponse.role;
    /**
     * Account active status
     */
    isActive?: boolean;
    /**
     * Last login timestamp
     */
    lastLoginAt?: string;
    /**
     * Account created timestamp
     */
    createdAt?: string;
};
export namespace UserInfoResponse {
    /**
     * User role
     */
    export enum role {
        VIEWER = 'VIEWER',
        SUPPORT = 'SUPPORT',
        ADMIN = 'ADMIN',
        SUPER_ADMIN = 'SUPER_ADMIN',
    }
}

