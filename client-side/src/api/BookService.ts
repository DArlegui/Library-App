/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../environment';
import { getJwt } from './JwtService';

export type BookType = {
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
