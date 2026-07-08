import { apiClient } from './client';
import type { CreateUserRequest, LoginRequest, LoginResponse, UserResponse } from '../types';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
  return data;
}

export async function register(payload: CreateUserRequest): Promise<UserResponse> {
  const { data } = await apiClient.post<UserResponse>('/users', payload);
  return data;
}
