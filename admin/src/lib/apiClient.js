/**
 * 2026-Standard API Client
 * Handles JWT authentication and Browser Fingerprinting.
 */

// Simple Browser Fingerprinting (e.g., using navigator.userAgent and screen)
const getFingerprint = () => {
  const { userAgent, platform, language } = navigator;
  const { width, height, colorDepth } = window.screen;
  return btoa(`${userAgent}|${platform}|${language}|${width}x${height}|${colorDepth}`);
};

export const apiClient = {
  fetch: async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const fingerprint = getFingerprint();

    const headers = {
      'Content-Type': 'application/json',
      'X-Fingerprint': fingerprint, // Security: Fingerprint header
      ...(token && { Authorization: `Bearer ${token}` }), // Security: JWT header
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Logic for token expiration/invalidation
      console.warn('Unauthorized request. Possible token expiration.');
    }

    return response.json();
  },
};
