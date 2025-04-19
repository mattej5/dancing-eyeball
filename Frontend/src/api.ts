import axios from 'axios';
import { EntertainerBookingSummary, EntertainerCreateDto } from './types/entertainer';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET: Get entertainer bookings
export const fetchEntertainerBookings = async (): Promise<EntertainerBookingSummary[]> => {
  const response = await api.get<EntertainerBookingSummary[]>('/Entertainers/bookings');
  return response.data;
};

// GET: Single entertainer by ID
export const fetchEntertainerById = async (id: number): Promise<EntertainerCreateDto> => {
  const res = await api.get<EntertainerCreateDto>(`/Entertainers/singleEnt/${id}`);
  return res.data;
};

// POST: Add a new entertainer
export const addEntertainer = async (dto: EntertainerCreateDto): Promise<void> => {
  await api.post('/Entertainers', dto);
};

// PUT: Update entertainer
export const updateEntertainer = async (id: number, dto: EntertainerCreateDto): Promise<void> => {
  await api.put(`/Entertainers/${id}`, dto);
};

// DELETE: Remove entertainer
export const deleteEntertainer = async (id: number): Promise<void> => {
  await api.delete(`/Entertainers/${id}`);
};
