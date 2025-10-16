/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ValidationError } from './ValidationError';
export type ErrorResponse = {
    timestamp?: string;
    status?: number;
    error?: string;
    message?: string;
    path?: string;
    errorCode?: string;
    validationErrors?: Array<ValidationError>;
    metadata?: Record<string, any>;
};

