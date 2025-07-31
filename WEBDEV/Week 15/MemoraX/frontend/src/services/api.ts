const API_BASE_URL = 'http://localhost:3000/api/v1';
import type { Content } from '../types/content';

export interface User {
  _id: string;
  username: string;
}

// Auth API
export const authApi = {
  signIn: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in');
    }
    
    return response.json();
  },
  
  signUp: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign up');
    }
    
    return response.json();
  },
};

// Content API
export const contentApi = {
  getAllContents: async (token: string): Promise<Content[]> => {
    const response = await fetch(`${API_BASE_URL}/content`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch contents');
    }
    
    return response.json();
  },
  
  createContent: async (content: Omit<Content, '_id' | 'userId' | 'createdAt'>, token: string): Promise<Content> => {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create content');
    }
    
    return response.json();
  },
  
  deleteContent: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete content');
    }
  },
  
  toggleFavorite: async (id: string, isFavorite: boolean, token: string): Promise<Content> => {
    const response = await fetch(`${API_BASE_URL}/content/${id}/favorite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ isFavorite }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update favorite status');
    }
    
    return response.json();
  },
};

// Type API
export const typeApi = {
  getAllTypes: async (token: string): Promise<{_id: string, name: string}[]> => {
    const response = await fetch(`${API_BASE_URL}/types`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch types');
    }
    
    return response.json();
  },
};

// Tag API
export const tagApi = {
  getAllTags: async (token: string): Promise<{_id: string, name: string}[]> => {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    
    return response.json();
  },
};
