// Remove trailing slash from base URL to avoid double slashes
// Ensure URL is HTTPS to avoid mixed content issues
const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_BASE_URL || 'https://fullstack-dealshop2.onrender.com';
  let baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  
  // Force HTTPS if URL starts with http:// (avoid mixed content)
  if (baseUrl.startsWith('http://')) {
    console.warn('API URL uses HTTP, converting to HTTPS to avoid mixed content issues');
    baseUrl = baseUrl.replace('http://', 'https://');
  }
  
  // Ensure URL starts with https://
  if (!baseUrl.startsWith('https://') && !baseUrl.startsWith('http://localhost')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  console.log('API Base URL:', baseUrl);
  return baseUrl;
};

const API_BASE_URL = getApiBaseUrl();

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  store: "Flipkart" | "myntra" | "meesho";
  affiliateLink: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => response.statusText);
        console.error(`API Error [${response.status}]:`, {
          url,
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`API error [${response.status}]: ${response.statusText}. ${errorText}`);
      }

      return response.json();
    } catch (error) {
      // Enhanced error handling for network issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Network error - possible causes:', {
          url,
          message: error.message,
          possibleCauses: [
            'CORS issue - check backend CORS settings',
            'Mixed content - ensure URL uses HTTPS',
            'Backend not responding - check Render logs',
            'SSL certificate issue - verify certificate validity'
          ]
        });
        throw new Error(`Network error: Failed to connect to ${url}. Check CORS, HTTPS, and backend status.`);
      }
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const data = await this.request<{ results?: Product[]; count?: number } | Product[]>('/products/');
      // Handle paginated response (Django REST Framework pagination)
      if (Array.isArray(data)) {
        return data;
      }
      // Handle paginated response with results key
      if (data && typeof data === 'object' && 'results' in data) {
        return data.results || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}/`);
  }

  async getProductsByStore(store: "Flipkart" | "myntra" | "meesho"): Promise<Product[]> {
    return this.request<Product[]>(`/products/by_store/?store=${store}`);
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) {
      return this.getProducts();
    }
    return this.request<Product[]>(`/products/search/?q=${encodeURIComponent(query)}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

