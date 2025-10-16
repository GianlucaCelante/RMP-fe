/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * User information included in login response
 */
export type UserInfo = {
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
    role?: UserInfo.role;
    /**
     * Last login timestamp
     */
    lastLoginAt?: string;
};
export namespace UserInfo {
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

