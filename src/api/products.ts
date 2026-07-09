import { apiClient } from './client';
import type { Page, ProductPayload, ProductResponse } from '../types';

export async function listProducts(page = 0, size = 20): Promise<Page<ProductResponse>> {
  const { data } = await apiClient.get<Page<ProductResponse>>('/products', {
    params: { page, size },
  });
  return data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const { data } = await apiClient.get<ProductResponse>(`/products/${id}`);
  return data;
}

export async function createProduct(payload: ProductPayload): Promise<ProductResponse> {
  const { data } = await apiClient.post<ProductResponse>('/products', payload);
  return data;
}

export async function updateProduct(id: number, payload: ProductPayload): Promise<ProductResponse> {
  const { data } = await apiClient.put<ProductResponse>(`/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
