
/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

/**
 * Creates a success response object.
 * @template T - The type of the data property.
 * @param {T} [data] - The data to include in the response.
 * @param {string} [message] - A message providing additional information about the response.
 * @returns {ApiResponse<T | {}>} The success response object.
 */
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

/**
 * Creates an error response object.
 * @template T - The type of the data property.
 * @param {T} [data] - The data to include in the response.
 * @param {string} [message] - A message providing additional information about the response.
 * @returns {ApiResponse<T | {}>} The error response object.
 */
export const errorResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "error",
    data,
    message,
});