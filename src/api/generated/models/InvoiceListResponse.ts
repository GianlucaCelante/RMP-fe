/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvoiceResponse } from './InvoiceResponse';
/**
 * Paginated list of invoices
 */
export type InvoiceListResponse = {
    /**
     * List of invoices
     */
    invoices?: Array<InvoiceResponse>;
    /**
     * Total number of invoices
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

