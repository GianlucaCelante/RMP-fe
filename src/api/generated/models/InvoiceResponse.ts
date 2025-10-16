/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Invoice details
 */
export type InvoiceResponse = {
    /**
     * Invoice unique identifier
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
     * Subscription ID
     */
    subscriptionId?: string;
    /**
     * Invoice number
     */
    invoiceNumber?: string;
    /**
     * Invoice status
     */
    status?: InvoiceResponse.status;
    /**
     * Billing period start date
     */
    billingPeriodStart?: string;
    /**
     * Billing period end date
     */
    billingPeriodEnd?: string;
    /**
     * Invoice due date
     */
    dueDate?: string;
    /**
     * Subtotal amount
     */
    subtotal?: number;
    /**
     * Tax rate percentage
     */
    taxRate?: number;
    /**
     * Tax amount
     */
    taxAmount?: number;
    /**
     * Discount amount
     */
    discountAmount?: number;
    /**
     * Total amount
     */
    total?: number;
    /**
     * Currency code
     */
    currency?: string;
    /**
     * Payment status
     */
    paymentStatus?: InvoiceResponse.paymentStatus;
    /**
     * Payment date
     */
    paymentDate?: string;
    /**
     * Payment method
     */
    paymentMethod?: string;
    /**
     * Payment reference
     */
    paymentReference?: string;
    /**
     * Notes
     */
    notes?: string;
    /**
     * Line items
     */
    lineItems?: Array<Record<string, any>>;
    /**
     * Invoice metadata
     */
    metadata?: Record<string, any>;
    /**
     * Is invoice overdue
     */
    isOverdue?: boolean;
    /**
     * Days overdue
     */
    daysOverdue?: number;
    /**
     * Creation timestamp
     */
    createdAt?: string;
    /**
     * Last update timestamp
     */
    updatedAt?: string;
};
export namespace InvoiceResponse {
    /**
     * Invoice status
     */
    export enum status {
        DRAFT = 'DRAFT',
        SENT = 'SENT',
        PAID = 'PAID',
        OVERDUE = 'OVERDUE',
        CANCELLED = 'CANCELLED',
    }
    /**
     * Payment status
     */
    export enum paymentStatus {
        PENDING = 'PENDING',
        PAID = 'PAID',
        PARTIAL = 'PARTIAL',
        FAILED = 'FAILED',
        REFUNDED = 'REFUNDED',
    }
}

