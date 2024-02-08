/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../environment';
import { getJwt } from './JwtService';

export type BookType = {
  id: number;
  img_url: string;
  title: string;
  author: string;
  year: number;
};

export const createBook = async (body: BookType) => {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify(body),
  });
  console.log(JSON.stringify(body));

  const data = await res.json();

  return data;
};

export const getUserBooks = async () => {
  const res = await fetch(`${API_URL}/books`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  const data = await res.json();

  return data;
};

export const getUserUpdateBook = async (id: number) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  const data = await res.json();

  return data;
};

export const deleteBook = async (id: number) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getJwt()}` },
  });

  const data = await res.json();

  return data;
};

export const updateBook = async (id: number, body: BookType) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
};
