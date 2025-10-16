/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Subscription details
 */
export type SubscriptionResponse = {
    /**
     * Subscription unique identifier
     */
    id?: string;
    /**
     * Tenant ID
     */
    tenantId?: string;
    /**
     * Tenant code
     */
    tenantCode?: string;
    /**
     * Tenant name
     */
    tenantName?: string;
    /**
     * Plan ID
     */
    planId?: string;
    /**
     * Plan code
     */
    planCode?: string;
    /**
     * Plan name
     */
    planName?: string;
    /**
     * Subscription status
     */
    status?: SubscriptionResponse.status;
    /**
     * Billing cycle
     */
    billingCycle?: SubscriptionResponse.billingCycle;
    /**
     * Current period start date
     */
    currentPeriodStart?: string;
    /**
     * Current period end date
     */
    currentPeriodEnd?: string;
    /**
     * Trial start date
     */
    trialStart?: string;
    /**
     * Trial end date
     */
    trialEnd?: string;
    /**
     * Cancel at period end
     */
    cancelAtPeriodEnd?: boolean;
    /**
     * Cancelled at timestamp
     */
    cancelledAt?: string;
    /**
     * Cancellation reason
     */
    cancelledReason?: string;
    /**
     * Payment method
     */
    paymentMethod?: string;
    /**
     * Last payment date
     */
    lastPaymentDate?: string;
    /**
     * Last payment amount
     */
    lastPaymentAmount?: number;
    /**
     * Next payment date
     */
    nextPaymentDate?: string;
    /**
     * Next payment amount
     */
    nextPaymentAmount?: number;
    /**
     * Subscription metadata
     */
    metadata?: Record<string, any>;
    /**
     * Creation timestamp
     */
    createdAt?: string;
    /**
     * Last update timestamp
     */
    updatedAt?: string;
};
export namespace SubscriptionResponse {
    /**
     * Subscription status
     */
    export enum status {
        TRIAL = 'TRIAL',
        ACTIVE = 'ACTIVE',
        PAST_DUE = 'PAST_DUE',
        CANCELLED = 'CANCELLED',
        EXPIRED = 'EXPIRED',
    }
    /**
     * Billing cycle
     */
    export enum billingCycle {
        MONTHLY = 'MONTHLY',
        YEARLY = 'YEARLY',
        CUSTOM = 'CUSTOM',
    }
}

