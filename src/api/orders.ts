import { apiClient } from './client';
import type { OrderRequest, OrderResponse, Page } from '../types';

export async function createOrder(payload: OrderRequest): Promise<OrderResponse> {
  const { data } = await apiClient.post<OrderResponse>('/orders', payload);
  return data;
}

export async function listOrders(page = 0, size = 20): Promise<Page<OrderResponse>> {
  const { data } = await apiClient.get<Page<OrderResponse>>('/orders', {
    params: { page, size },
  });
  return data;
}

export async function getOrderById(id: number): Promise<OrderResponse> {
  const { data } = await apiClient.get<OrderResponse>(`/orders/${id}`);
  return data;
}
