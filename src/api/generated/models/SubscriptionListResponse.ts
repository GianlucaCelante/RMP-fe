/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionResponse } from './SubscriptionResponse';
/**
 * Paginated list of subscriptions
 */
export type SubscriptionListResponse = {
    /**
     * List of subscriptions
     */
    subscriptions?: Array<SubscriptionResponse>;
    /**
     * Total number of subscriptions
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

