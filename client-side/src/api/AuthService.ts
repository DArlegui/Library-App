import { API_URL } from '../environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (body: any) => {
  console.log('body', body);

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await res.json();
};
