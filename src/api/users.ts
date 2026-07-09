import { apiClient } from './client';
import type { Page, UpdateUserRequest, UserResponse } from '../types';

export async function listUsers(page = 0, size = 20): Promise<Page<UserResponse>> {
  const { data } = await apiClient.get<Page<UserResponse>>('/users', {
    params: { page, size },
  });
  return data;
}

export async function getUserById(id: number): Promise<UserResponse> {
  const { data } = await apiClient.get<UserResponse>(`/users/${id}`);
  return data;
}

export async function updateUser(id: number, payload: UpdateUserRequest): Promise<UserResponse> {
  const { data } = await apiClient.put<UserResponse>(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
