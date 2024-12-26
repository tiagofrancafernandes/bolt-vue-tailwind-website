/**
 * Safely encodes URL parameters
 */
export function encodeQueryParam(param: string): string {
    return encodeURIComponent(param).replace(/%20/g, '+');
}

/**
 * Builds a URL with query parameters
 */
export function buildUrl(baseUrl: string, params: Record<string, string>): string | URL {
    // Ensure the base URL is properly formatted
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}`;

    const queryParams = Object.entries(params)
        .map(([key, value]) => `${encodeQueryParam(key)}=${encodeQueryParam(value)}`)
        .join('&');

    let res = queryParams ? `${normalizedBaseUrl}?${queryParams}` : normalizedBaseUrl;

    return new URL(res);
}
