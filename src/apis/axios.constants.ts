export const baseURL = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`;
// export const timeout = 10000;
export const headers = {
  'Content-Type': 'application/json',
};
export const withCredentials = true;
