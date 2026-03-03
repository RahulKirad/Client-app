// API client for MySQL backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  material: string;
  print_type: string;
  packaging: string;
  moq: string;
  price: number;
  image_url: string;
  gallery_images: string[];
  specifications: Record<string, any>;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  company?: string;
  email: string;
  region?: string;
  order_type?: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  content: Record<string, any>;
  is_active: boolean;
  updated_at: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products');
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products/featured');
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Inquiries
  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>): Promise<{ message: string; id: string }> {
    return this.request<{ message: string; id: string }>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }

  // Content
  async getContentSection(sectionKey: string): Promise<ContentSection> {
    return this.request<ContentSection>(`/content/${sectionKey}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }

  // Chatbot
  async getChatbotSettings(): Promise<{ enabled: boolean; welcomeMessage: string | null }> {
    const url = `${API_BASE_URL}/chatbot/settings?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store', headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return {
      enabled: data.enabled === true || data.enabled === 1,
      welcomeMessage: data.welcomeMessage ?? null,
    };
  }

  async sendChatMessage(
    message: string,
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<{ message: string; timestamp: string }> {
    return this.request<{ message: string; timestamp: string }>('/chatbot/message', {
      method: 'POST',
      body: JSON.stringify({ message, conversationHistory }),
    });
  }

  async getChatbotDiagnostics(): Promise<any> {
    return this.request<any>('/chatbot/diagnostics');
  }
}

export const apiClient = new ApiClient();