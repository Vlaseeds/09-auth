import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export const register = async (data: Record<string, unknown>): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const login = async (data: Record<string, unknown>): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const updateMe = async (data: Record<string, unknown>): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNotes = async (
  page = 1, 
  perPage = 12, 
  search = '', 
  tag = 'all'
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get('/notes', { 
    params: { page, perPage, search, tag: tag === 'all' ? '' : tag } 
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: Record<string, unknown>): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const response = await api.get('/auth/session');
  return response.data;
};