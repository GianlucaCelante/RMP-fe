/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to cancel subscription
 */
export type CancelSubscriptionRequest = {
    /**
     * Cancellation reason
     */
    reason: string;
    /**
     * Cancel immediately or at period end
     */
    immediate?: boolean;
};

