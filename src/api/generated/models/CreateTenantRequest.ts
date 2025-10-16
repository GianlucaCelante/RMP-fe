/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to create a new tenant
 */
export type CreateTenantRequest = {
    /**
     * Unique tenant code
     */
    code: string;
    /**
     * Tenant display name
     */
    name: string;
    /**
     * Legal company name
     */
    legalName?: string;
    /**
     * VAT number
     */
    vatNumber?: string;
    /**
     * Fiscal code
     */
    fiscalCode?: string;
    /**
     * Contact email
     */
    email: string;
    /**
     * Contact phone
     */
    phone?: string;
    /**
     * Street address
     */
    address?: string;
    /**
     * City
     */
    city?: string;
    /**
     * Province/State
     */
    province?: string;
    /**
     * Postal code
     */
    postalCode?: string;
    /**
     * Country code ISO-2
     */
    country?: string;
    /**
     * Timezone
     */
    timezone?: string;
    /**
     * Locale
     */
    locale?: string;
    /**
     * Currency code
     */
    currency?: string;
    /**
     * Subscription plan code
     */
    planCode: string;
    /**
     * Billing cycle
     */
    billingCycle: string;
};

