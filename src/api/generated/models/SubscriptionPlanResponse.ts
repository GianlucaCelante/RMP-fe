/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Subscription plan details
 */
export type SubscriptionPlanResponse = {
    /**
     * Plan unique identifier
     */
    id?: string;
    /**
     * Plan code
     */
    code?: string;
    /**
     * Plan name
     */
    name?: string;
    /**
     * Plan description
     */
    description?: string;
    /**
     * Monthly price
     */
    priceMonthly?: number;
    /**
     * Yearly price
     */
    priceYearly?: number;
    /**
     * Trial days
     */
    trialDays?: number;
    /**
     * Maximum users
     */
    maxUsers?: number;
    /**
     * Maximum branches
     */
    maxBranches?: number;
    /**
     * Maximum monthly orders
     */
    maxOrdersMonthly?: number;
    /**
     * Plan features
     */
    features?: Record<string, any>;
    /**
     * Plan limits
     */
    limits?: Record<string, any>;
    /**
     * Is plan active
     */
    isActive?: boolean;
    /**
     * Is plan visible
     */
    isVisible?: boolean;
    /**
     * Sort order
     */
    sortOrder?: number;
    /**
     * Creation timestamp
     */
    createdAt?: string;
    /**
     * Last update timestamp
     */
    updatedAt?: string;
};

