/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPlanResponse } from './SubscriptionPlanResponse';
/**
 * Paginated list of subscription plans
 */
export type SubscriptionPlanListResponse = {
    /**
     * List of subscription plans
     */
    plans?: Array<SubscriptionPlanResponse>;
    /**
     * Total number of plans
     */
    total?: number;
    /**
     * Current page number (0-based)
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

