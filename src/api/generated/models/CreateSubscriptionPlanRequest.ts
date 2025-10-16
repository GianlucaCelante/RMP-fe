/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to create a new subscription plan
 */
export type CreateSubscriptionPlanRequest = {
    /**
     * Unique plan code
     */
    code: string;
    /**
     * Plan display name
     */
    name: string;
    /**
     * Plan description
     */
    description?: string;
    /**
     * Monthly subscription price
     */
    priceMonthly: number;
    /**
     * Yearly subscription price (optional)
     */
    priceYearly?: number;
    /**
     * Trial period in days
     */
    trialDays?: number;
    /**
     * Maximum number of users allowed
     */
    maxUsers?: number;
    /**
     * Maximum number of branches allowed
     */
    maxBranches?: number;
    /**
     * Maximum orders per month
     */
    maxOrdersMonthly?: number;
    /**
     * Plan features (JSON object)
     */
    features?: Record<string, any>;
    /**
     * Plan limits (JSON object)
     */
    limits?: Record<string, any>;
    /**
     * Whether the plan is active
     */
    isActive: boolean;
    /**
     * Whether the plan is visible to customers
     */
    isVisible: boolean;
    /**
     * Display sort order
     */
    sortOrder?: number;
};

