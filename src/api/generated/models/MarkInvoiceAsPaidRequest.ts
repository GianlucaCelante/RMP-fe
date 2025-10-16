/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to mark invoice as paid
 */
export type MarkInvoiceAsPaidRequest = {
    /**
     * Payment method
     */
    paymentMethod: string;
    /**
     * Payment reference or transaction ID
     */
    paymentReference: string;
};

