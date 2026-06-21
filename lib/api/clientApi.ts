import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

interface AuthPayload {
  email: string;
  password: string;
}

interface NotePayload {
  title: string;
  content: string;
  tag: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  [key: string]: unknown;
}

export const register = async (data: AuthPayload): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const login = async (data: AuthPayload): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const updateMe = async (data: Partial<User>): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNotes = async (
  page = 1, 
  perPage = 12, 
  search = '', 
  tag = 'all'
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', { 
    params: { page, perPage, search, tag: tag === 'all' ? '' : tag } 
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NotePayload): Promise<Note> => {
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

export const checkSession = async (): Promise<{ user: User }> => {
  const response = await api.get<{ user: User }>('/auth/session');
  return response.data;
};