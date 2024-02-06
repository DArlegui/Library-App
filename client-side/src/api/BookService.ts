/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../environment';
import { getJwt } from './JwtService';

export const createBook = async (body: any) => {
  const res = await fetch(`${API_URL}/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
};
