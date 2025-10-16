/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelInvoiceRequest } from '../models/CancelInvoiceRequest';
import type { InvoiceListResponse } from '../models/InvoiceListResponse';
import type { InvoiceResponse } from '../models/InvoiceResponse';
import type { MarkInvoiceAsPaidRequest } from '../models/MarkInvoiceAsPaidRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BillingInvoicesService {
    /**
     * Mark invoice as sent
     * Mark a draft invoice as sent to the customer. Only draft invoices can be marked as sent. Requires SUPER_ADMIN role.
     * @param id Invoice unique identifier (UUID)
     * @returns InvoiceResponse Invoice marked as sent successfully
     * @throws ApiError
     */
    public static markInvoiceAsSent(
        id: string,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/invoices/{id}/send',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid operation - Invoice is not in draft status`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Invoice not found with the specified ID`,
                500: `Internal server error - Failed to mark invoice as sent`,
            },
        });
    }
    /**
     * Mark invoice as paid
     * Mark an invoice as paid with payment details. Requires SUPER_ADMIN role.
     * @param id Invoice unique identifier (UUID)
     * @param requestBody Payment details
     * @returns InvoiceResponse Invoice marked as paid successfully
     * @throws ApiError
     */
    public static markInvoiceAsPaid(
        id: string,
        requestBody: MarkInvoiceAsPaidRequest,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/invoices/{id}/pay',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Invoice not found with the specified ID`,
                500: `Internal server error - Failed to mark invoice as paid`,
            },
        });
    }
    /**
     * Cancel invoice
     * Cancel an invoice with a reason. Only draft or sent invoices can be cancelled. Requires SUPER_ADMIN role.
     * @param id Invoice unique identifier (UUID)
     * @param requestBody Cancellation request with reason
     * @returns InvoiceResponse Invoice cancelled successfully
     * @throws ApiError
     */
    public static cancelInvoice(
        id: string,
        requestBody: CancelInvoiceRequest,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/invoices/{id}/cancel',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request data - Validation errors in request body`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Requires SUPER_ADMIN role`,
                404: `Invoice not found with the specified ID`,
                500: `Internal server error - Failed to cancel invoice`,
            },
        });
    }
    /**
     * Get all invoices
     * Retrieve a paginated list of all billing invoices in the platform. Requires SUPER_ADMIN or ADMIN role.
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @returns InvoiceListResponse Successfully retrieved invoice list
     * @throws ApiError
     */
    public static getAllInvoices(
        page?: number,
        size: number = 20,
        sort: string = 'createdAt',
        direction: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<InvoiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices',
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'direction': direction,
            },
            errors: {
                400: `Invalid pagination parameters`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get invoice by ID
     * Retrieve detailed information about a specific invoice by its unique identifier. Requires SUPER_ADMIN or ADMIN role.
     * @param id Invoice unique identifier (UUID)
     * @returns InvoiceResponse Successfully retrieved invoice
     * @throws ApiError
     */
    public static getInvoiceById(
        id: string,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Invoice not found with the specified ID`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get invoices by tenant ID
     * Retrieve all invoices for a specific tenant. Requires SUPER_ADMIN or ADMIN role.
     * @param tenantId Tenant unique identifier (UUID)
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sort Sort field
     * @param direction Sort direction (ASC or DESC)
     * @returns InvoiceListResponse Successfully retrieved invoice list
     * @throws ApiError
     */
    public static getInvoicesByTenantId(
        tenantId: string,
        page?: number,
        size: number = 20,
        sort: string = 'createdAt',
        direction: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<InvoiceListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices/tenant/{tenantId}',
            path: {
                'tenantId': tenantId,
            },
            query: {
                'page': page,
                'size': size,
                'sort': sort,
                'direction': direction,
            },
            errors: {
                400: `Invalid pagination parameters`,
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get invoice by invoice number
     * Retrieve detailed information about a specific invoice by its invoice number. Requires SUPER_ADMIN or ADMIN role.
     * @param invoiceNumber Invoice number
     * @returns InvoiceResponse Successfully retrieved invoice
     * @throws ApiError
     */
    public static getInvoiceByNumber(
        invoiceNumber: string,
    ): CancelablePromise<InvoiceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/invoices/number/{invoiceNumber}',
            path: {
                'invoiceNumber': invoiceNumber,
            },
            errors: {
                401: `Authentication required - Missing or invalid JWT token`,
                403: `Access denied - Insufficient permissions`,
                404: `Invoice not found with the specified invoice number`,
                500: `Internal server error`,
            },
        });
    }
}
