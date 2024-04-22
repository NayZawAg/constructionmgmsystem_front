import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const readCookie = async (key: string): Promise<string> => {
  // console.log("read cookie")
  // Parse
  const cookies = parseCookies();
  const value = cookies[key];
  return value;
};

export const createCookie = async (
  key: string,
  value: string,
): Promise<void> => {
  // Set
  setCookie(null, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const deleteCookie = async (key: string): Promise<void> => {
  // console.log("delete cookie")
  // Destroy
  destroyCookie(null, key);
};
