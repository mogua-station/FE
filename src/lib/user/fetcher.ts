interface FetchOptions extends RequestInit {
  auth?: boolean;
}

/**
 * 토큰 주입 방식
 * 1. 유저가 필요한 요청:
 * await fetcher('/user/profile/me', token, {auth: true});
 * 2. 유저가 필요 없는 요청:
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
