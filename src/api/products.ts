import { apiClient } from './client';
import type { Page, ProductResponse } from '../types';

export async function listProducts(page = 0, size = 20): Promise<Page<ProductResponse>> {
  const { data } = await apiClient.get<Page<ProductResponse>>('/products', {
    params: { page, size },
  });
  return data;
}
