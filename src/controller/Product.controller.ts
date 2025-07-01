import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Vendor {
  name: string;
  link: string;
}

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  vendors: Vendor[];
  description: string;
  category: string;
  inStock: boolean;
  created_at: string;
  updated_at: string;
};

export interface ProductFilters {
  category?: string;
  brand?: string;
  in_stock?: boolean;
}

export const fetchProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    console.log('Fetching products...');
    
    let url = '/products/getProducts';
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.in_stock !== undefined) params.append('in_stock', filters.in_stock.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await api.get(url);
    console.log('API Response:', res.data);
    
    if (!res.data || !Array.isArray(res.data)) {
      console.warn('Invalid response format:', res.data);
      return [];
    }

    const products = res.data.map((p: any) => {
      console.log('Processing product:', p);
      
      return {
        id: p.id || p._id || Math.random().toString(),
        name: p.name || 'Unnamed Product',
        brand: p.brand || 'Unknown Brand',
        price: p.price || 0,
        image: p.image || '',
        vendors: p.vendors || [],
        description: p.description || 'No description available',
        category: p.category || 'Uncategorized',
        inStock: p.inStock !== undefined ? p.inStock : true,
        created_at: p.created_at || new Date().toISOString(),
        updated_at: p.updated_at || new Date().toISOString(),
      };
    }).reverse();

    console.log(`Processed ${products.length} products`);
    return products;
    
  } catch (error: any) {
    console.error('Error fetching products:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return [];
  }
};

export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    console.log('Fetching product by ID:', productId);
    const res = await api.get(`/products/getProduct/${productId}`);
    console.log('API Response:', res.data);
    
    if (!res.data) {
      console.warn('No product data received');
      return null;
    }

    const product: Product = {
      id: res.data.id || res.data._id,
      name: res.data.name || 'Unnamed Product',
      brand: res.data.brand || 'Unknown Brand',
      price: res.data.price || 0,
      image: res.data.image || '',
      vendors: res.data.vendors || [],
      description: res.data.description || 'No description available',
      category: res.data.category || 'Uncategorized',
      inStock: res.data.inStock !== undefined ? res.data.inStock : true,
      created_at: res.data.created_at,
      updated_at: res.data.updated_at,
    };

    return product;
    
  } catch (error: any) {
    console.error('Error fetching product:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 404) {
        return null;
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return null;
  }
};

export const addProduct = async (
  name: string, 
  brand: string, 
  price: number, 
  image: string, 
  vendors: Vendor[], 
  description: string, 
  category: string, 
  inStock: boolean = true
): Promise<Product> => {
  try {
    console.log('Creating new product...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Validate required fields
    if (!name.trim()) {
      throw new Error('Product name is required');
    }
    if (!brand.trim()) {
      throw new Error('Product brand is required');
    }
    if (!category.trim()) {
      throw new Error('Product category is required');
    }
    if (!description.trim()) {
      throw new Error('Product description is required');
    }
    if (price <= 0) {
      throw new Error('Product price must be greater than 0');
    }

    // Validate vendors
    if (!vendors || vendors.length === 0) {
      throw new Error('At least one vendor is required');
    }

    const validVendors = vendors.filter(v => v.name.trim() && v.link.trim());
    if (validVendors.length === 0) {
      throw new Error('At least one vendor must have both name and link');
    }

    const productData = {
      name: name.trim(),
      brand: brand.trim(),
      price: parseFloat(price.toString()),
      image: image.trim(),
      vendors: validVendors,
      description: description.trim(),
      category: category.trim(),
      inStock: inStock
    };

    console.log('Sending product data:', productData);

    const res = await api.post('/products/createProduct', productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Product created successfully:', res.data);

    const createdProduct: Product = {
      id: res.data.id || res.data._id,
      name: res.data.name,
      brand: res.data.brand,
      price: res.data.price,
      image: res.data.image,
      vendors: res.data.vendors,
      description: res.data.description,
      category: res.data.category,
      inStock: res.data.inStock,
      created_at: res.data.created_at,
      updated_at: res.data.updated_at,
    };

    return createdProduct;

  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.detail || 'Invalid product data';
        throw new Error(errorMessage);
      } else if (error.response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to create product');
  }
};

export const updateProduct = async (
  productId: string,
  name?: string, 
  brand?: string, 
  price?: number, 
  image?: string, 
  vendors?: Vendor[], 
  description?: string, 
  category?: string, 
  inStock?: boolean
): Promise<Product> => {
  try {
    console.log('Updating product...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const productData: any = {};
    
    if (name !== undefined) productData.name = name.trim();
    if (brand !== undefined) productData.brand = brand.trim();
    if (price !== undefined) productData.price = parseFloat(price.toString());
    if (image !== undefined) productData.image = image.trim();
    if (vendors !== undefined) {
      const validVendors = vendors.filter(v => v.name.trim() && v.link.trim());
      if (validVendors.length === 0) {
        throw new Error('At least one vendor must have both name and link');
      }
      productData.vendors = validVendors;
    }
    if (description !== undefined) productData.description = description.trim();
    if (category !== undefined) productData.category = category.trim();
    if (inStock !== undefined) productData.inStock = inStock;

    console.log('Sending update data:', productData);

    const res = await api.put(`/products/updateProduct/${productId}`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Product updated successfully:', res.data);

    const updatedProduct: Product = {
      id: res.data.id || res.data._id,
      name: res.data.name,
      brand: res.data.brand,
      price: res.data.price,
      image: res.data.image,
      vendors: res.data.vendors,
      description: res.data.description,
      category: res.data.category,
      inStock: res.data.inStock,
      created_at: res.data.created_at,
      updated_at: res.data.updated_at,
    };

    return updatedProduct;

  } catch (error: any) {
    console.error('Error updating product:', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 403) {
        throw new Error('You are not authorized to update this product.');
      } else if (error.response.status === 404) {
        throw new Error('Product not found.');
      } else if (error.response.status === 400) {
        const errorMessage = error.response.data?.detail || 'Invalid product data';
        throw new Error(errorMessage);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to update product');
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    console.log('Deleting product...');
    
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    await api.delete(`/products/deleteProduct/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    console.log('Product deleted successfully');

  } catch (error: any) {
    console.error('Error deleting product:', error);
    
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      } else if (error.response.status === 403) {
        throw new Error('You are not authorized to delete this product.');
      } else if (error.response.status === 404) {
        throw new Error('Product not found.');
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error(error.message || 'Failed to delete product');
  }
};

export const testProductAPIConnection = async (): Promise<boolean> => {
  try {
    const res = await api.get('/products/getProducts');
    console.log('Product API connection test successful');
    return true;
  } catch (error) {
    console.error('Product API connection test failed:', error);
    return false;
  }
};