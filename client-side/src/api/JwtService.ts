const jwtKey = 'book-app-jwt';

export const setJwt = (jwt: string) => {
  localStorage.setItem(jwtKey, jwt);
};

export const getJwt = () => {
  return localStorage.getItem(jwtKey);
};

export const removeJwt = () => {
  localStorage.removeItem(jwtKey);
};
