type RequestData = Record<string, any> | FormData;

async function fetcher(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  data?: RequestData,
  options: Omit<RequestInit, "method" | "body"> = {},
) {
  const config = {
    ...options,
    method,
    credentials: "include" as RequestCredentials,
    headers: {
      ...(data instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),
      ...options.headers,
    },
    ...(data && {
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  };

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);
}

export const get = (url: string, options?: Omit<RequestInit, "method">) =>
  fetcher(url, "GET", undefined, options);

export const post = <T extends RequestData>(
  url: string,
  data?: T,
  options?: Omit<RequestInit, "method" | "body">,
) => fetcher(url, "POST", data, options);

export const patch = <T extends RequestData>(
  url: string,
  data?: T,
  options?: Omit<RequestInit, "method" | "body">,
) => fetcher(url, "PATCH", data, options);

export const del = (url: string, options?: Omit<RequestInit, "method">) =>
  fetcher(url, "DELETE", undefined, options);
