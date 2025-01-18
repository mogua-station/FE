interface FetchOptions extends RequestInit {
  auth?: boolean;
}

/**
 * credentials: "include" 옵션을 사용하여 쿠키를 포함한 요청을 보낼 수 있도록 함
 * 1. 인증 필요한 요청:
 * await fetcher('/user/profile/me', {auth: true});
 * 2. 인증 필요 없는 요청:
 * await fetcher('/user/userId);
 */
/* export async function fetcher(
  url: string,
  { auth, ...options }: FetchOptions = {},
) {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (auth) {
    config.credentials = "include";
  }

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
} */

/**
 * 토큰 주입 방식
 * 1. 인증 필요한 요청:
 * await fetcher('/user/profile/me', token, {auth: true});
 * 2. 인증 필요 없는 요청:
 * await fetcher('/user/userId, token);
 */
export async function fetcher(
  url: string,
  token: string,
  { auth, headers, ...options }: FetchOptions = {},
) {
  const config = {
    ...options,
    headers: {
      ...(!(options.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...(auth && token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
}
