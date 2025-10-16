/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TenantResponse } from './TenantResponse';
/**
 * Paginated list of tenants
 */
export type TenantListResponse = {
    /**
     * List of tenants
     */
    tenants?: Array<TenantResponse>;
    /**
     * Total number of tenants
     */
    total?: number;
    /**
     * Current page number
     */
    page?: number;
    /**
     * Page size
     */
    size?: number;
    /**
     * Total number of pages
     */
    totalPages?: number;
};

