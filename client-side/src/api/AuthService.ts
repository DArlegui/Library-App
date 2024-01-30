/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '../environment';

export const register = async (body: any) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
};

export const LogIn = async (body: any) => {
  const res = await fetch(`${API_URL}/log-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
};
