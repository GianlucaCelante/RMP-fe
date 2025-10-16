/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to change billing cycle
 */
export type ChangeBillingCycleRequest = {
    /**
     * New billing cycle
     */
    billingCycle: ChangeBillingCycleRequest.billingCycle;
};
export namespace ChangeBillingCycleRequest {
    /**
     * New billing cycle
     */
    export enum billingCycle {
        MONTHLY = 'MONTHLY',
        YEARLY = 'YEARLY',
        CUSTOM = 'CUSTOM',
    }
}

