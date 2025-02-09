export async function fetcher(
  url: string,
  { headers, ...options }: RequestInit = {},
) {
  const config = {
    ...options,
    credentials: "include" as RequestCredentials,
    headers: {
      ...(!(options.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...headers,
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
}
