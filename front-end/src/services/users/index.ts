import { api } from '@/services/';
import { IUser } from './types';

export const signIn = async (data: { email: string, password: string }) => {
    const response = await api.post<{auth: boolean, token: string}>('/user/signin', data);
    api.defaults.headers.common['Authorization'] = response.data.token
    return response.data
}

export const register = async (data: { name: string, email: string, password: string }) => {
    const response = await api.post<IUser>('/user', data);
    return response.data
}

export const getAllUsers = async (): Promise<any> => {
    const response = await api.get<IUser>('/user');
    return response.data
}