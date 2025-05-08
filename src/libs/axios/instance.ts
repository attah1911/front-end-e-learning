import environment from "../../config/environment";
import { SessionExtended } from "../../types/Auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

// Create a custom event for loading state
const loadingEvent = new CustomEvent('apiLoadingChange');

// Ensure we have a valid API URL
const API_URL = environment.API_URL;

if (!API_URL) {
  console.warn('API_URL is not set in environment variables. Using default:', API_URL);
}

const instance = axios.create({
  baseURL: API_URL,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Track active requests
let activeRequests = 0;

const updateLoading = (isLoading: boolean) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('apiLoadingChange', { 
      detail: { isLoading } 
    }));
  }
};

// Request interceptor
instance.interceptors.request.use(
  async (request) => {
    activeRequests++;
    updateLoading(true);

    try {
      const session = await getSession() as SessionExtended | null;
      
      // Add auth header if we have a token
      if (session?.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      
      // Don't transform FormData
      if (request.data instanceof FormData) {
        request.transformRequest = [(data) => data];
        delete request.headers['Content-Type'];
      }

      return request;
    } catch (error) {
      console.error('Session fetch error:', error);
      return request;
    }
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      updateLoading(false);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) {
      updateLoading(false);
    }
    return response;
  },
  async (error) => {
    activeRequests--;
    if (activeRequests === 0) {
      updateLoading(false);
    }

    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject(error);
    }

    // Log error details
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle 401/403 errors (including token expiration)
    if (error.response.status === 401 || error.response.status === 403) {
      if (typeof window !== 'undefined') {
        // Sign out and redirect to login page with callback URL
        const currentPath = window.location.pathname;
        signOut({ 
          callbackUrl: `/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`
        }).catch(console.error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;