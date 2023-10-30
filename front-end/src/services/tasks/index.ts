import { api } from '@/services/';
import { ITask } from './types';

export const getAllTasks = async (): Promise<any> => {
    const response = await api.get<ITask>('/task');
    return response.data
}

export const deleteTask = async (id: string): Promise<ITask> => {
    const response = await api.delete<ITask>(`/task/${id}`);
    return response.data
}

export const addTask = async (data: {title: string, description: string, responsible: string}): Promise<ITask> => {
    const response = await api.post<ITask>(`/task`, {...data, tags: []});
    return response.data
}