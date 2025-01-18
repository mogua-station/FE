import { useEffect, useState } from "react";

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue || null;
  }
  return null;
};

const useCookie = (cookieName: string): string | null => {
  const [cookieValue, setCookieValue] = useState<string | null>(
    getCookie(cookieName),
  );

  useEffect(() => {
    const cookie = getCookie(cookieName);
    if (cookieValue !== cookie) {
      setCookieValue(cookie);
    }
  }, [cookieName, cookieValue]);

  return cookieValue;
};

export const deleteCookie = (
  name: string,
  path: string = "/",
  domain: string = "",
) => {
  document.cookie = `${name}=; Max-Age=-1; path=${path}; domain=${domain};`;
};

export default useCookie;
