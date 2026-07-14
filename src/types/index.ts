export type UserType = 'ADMIN' | 'CLIENT' | 'ATTENDANT';
export type UserStatus = 'ACTIVE' | 'BLOCKED';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userStatus: UserStatus;
  userType: UserType;
  phoneNumber: string | null;
  cpf: string | null;
  imageUrl: string | null;
  creationDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  userType: UserType;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string | null;
  cpf?: string | null;
  imageUrl?: string | null;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  username: string;
  fullName: string;
  phoneNumber: string | null;
  cpf: string | null;
  imageUrl: string | null;
  userType: UserType;
  userStatus: UserStatus;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  items: OrderItemResponse[];
  total: number;
  creationDate: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ErrorResponse {
  status: number;
  message: string;
  errors: Record<string, string> | null;
}
