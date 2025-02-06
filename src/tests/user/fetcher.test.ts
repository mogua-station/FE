import { fetcher } from "@/lib/user/fetcher";

describe("fetcher", () => {
  const mockData = { data: "test" };
  const mockResponse = {
    ok: true,
    json: () => Promise.resolve(mockData),
  } as Response;

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn(() => Promise.resolve(mockResponse));
  });

  describe("기본 동작", () => {
    it("기본 GET 요청을 성공적으로 처리한다", async () => {
      const res = await fetcher("/test", "");
      const data = await res.json();

      expect(res.ok).toBe(true);
      expect(data).toEqual(mockData);
    });

    it("HTTP 메서드를 설정할 수 있다", async () => {
      const originalData = { title: "수정 전" };
      const updateData = { title: "수정 후" };

      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(updateData),
        }),
      );

      const res = await fetcher("/update", "", {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify(updateData),
        }),
      );

      const data = await res.json();
      expect(data).toEqual(updateData);
      expect(data).not.toEqual(originalData);
    });
  });

  describe("헤더 처리", () => {
    it("인증 토큰이 필요한 요청을 성공적으로 처리한다", async () => {
      const token = "test-token";
      const res = await fetcher("/auth-test", token, { auth: true });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        }),
      );

      const data = await res.json();
      expect(data).toEqual(mockData);
    });

    it("커스텀 헤더를 설정할 수 있다", async () => {
      const customHeaders = {
        "Accept-Language": "ko-KR",
      };
      const token = "test-token";

      await fetcher("/test", token, {
        auth: true,
        headers: customHeaders,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...customHeaders,
          }),
        }),
      );
    });

    it("FormData 요청시 Content-Type: application/json이 설정되지 않는다", async () => {
      const formData = new FormData();
      formData.append("key", "value");

      await fetcher("/upload", "", {
        method: "POST",
        body: formData,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: formData,
          headers: expect.not.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.body).toBeInstanceOf(FormData);
    });
  });

  describe("Next.js 옵션 처리", () => {
    it("Next.js fetch 옵션을 처리할 수 있다", async () => {
      const nextOptions = {
        cache: "no-store" as const,
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ko-KR",
        },
      };

      await fetcher("/test", "", nextOptions);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(nextOptions),
      );
    });
  });
});
