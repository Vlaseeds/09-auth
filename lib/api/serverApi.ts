import { cookies } from 'next/headers';
import { api } from './api';
import type { User } from '../../types/user';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value; 
  return token ? { Cookie: `token=${token}` } : {};
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get('/auth/session', { headers });
    return response.data ? response.data : null;
  } catch (error) {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const response = await api.get<User>('/users/me', { headers });
  return response.data;
};