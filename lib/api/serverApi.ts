import { cookies } from 'next/headers';
import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString(); 
  
  return {
    Cookie: allCookies,
  };
};

export const checkSession = async () => {
  const headers = await getAuthHeaders();
  const response = await api.get('/auth/session', { headers });
  return response;
};

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const response = await api.get<User>('/users/me', { headers });
  return response.data;
};

export const fetchNotes = async (
  page = 1, 
  perPage = 12, 
  search = '', 
  tag = 'all'
): Promise<{ notes: Note[]; totalPages: number }> => {
  const headers = await getAuthHeaders();
  const response = await api.get('/notes', { 
    headers, 
    params: { page, perPage, search, tag: tag === 'all' ? '' : tag } 
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
};