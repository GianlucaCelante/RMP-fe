/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Tenant information response
 */
export type TenantResponse = {
    /**
     * Tenant unique identifier
     */
    id?: string;
    /**
     * Tenant code (URL-friendly)
     */
    code?: string;
    /**
     * Tenant display name
     */
    name?: string;
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
    email?: string;
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
     * Tenant status
     */
    status?: TenantResponse.status;
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
     * Creation timestamp
     */
    createdAt?: string;
    /**
     * Activation timestamp
     */
    activatedAt?: string;
    /**
     * Suspension timestamp
     */
    suspendedAt?: string;
    /**
     * Cancellation timestamp
     */
    cancelledAt?: string;
};
export namespace TenantResponse {
    /**
     * Tenant status
     */
    export enum status {
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
        PENDING = 'PENDING',
        CANCELLED = 'CANCELLED',
        DELETED = 'DELETED',
    }
}

