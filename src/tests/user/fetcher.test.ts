import { get, post, patch, del } from "@/lib/user/fetcher";

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

  describe("공통 기능", () => {
    it("credentials가 include로 설정된다", async () => {
      await get("/test");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: "include",
        }),
      );
    });

    it("커스텀 헤더를 설정할 수 있다", async () => {
      const customHeaders = {
        "Accept-Language": "ko-KR",
      };

      await get("/test", {
        headers: customHeaders,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            ...customHeaders,
          }),
        }),
      );
    });

    it("JSON 데이터는 자동으로 직렬화된다", async () => {
      const data = { name: "test" };
      await post("/test", data);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(data),
        }),
      );
    });

    it("FormData는 직렬화되지 않고 Content-Type이 설정되지 않는다", async () => {
      const formData = new FormData();
      formData.append("key", "value");

      await post("/test", formData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: formData,
          headers: expect.not.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("Next.js 옵션을 처리할 수 있다", async () => {
      const nextOptions = {
        cache: "no-store" as const,
        next: { revalidate: 60 },
      };

      await get("/test", nextOptions);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining(nextOptions),
      );
    });
  });

  describe("HTTP Methods", () => {
    describe("GET", () => {
      it("GET 요청을 처리한다", async () => {
        const res = await get("/test");
        const data = await res.json();

        expect(res.ok).toBe(true);
        expect(data).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: "GET",
          }),
        );
      });
    });

    describe("POST", () => {
      it("POST 요청을 처리한다", async () => {
        const postData = { name: "test" };
        await post("/test", postData);

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: "POST",
            body: JSON.stringify(postData),
          }),
        );
      });
    });

    describe("PATCH", () => {
      it("PATCH 요청을 처리한다", async () => {
        const updateData = { name: "updated" };
        const res = await patch("/test", updateData);
        const data = await res.json();

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: "PATCH",
            body: JSON.stringify(updateData),
          }),
        );
        expect(data).toEqual(mockData);
      });
    });

    describe("DELETE", () => {
      it("DELETE 요청을 처리한다", async () => {
        await del("/test");

        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: "DELETE",
          }),
        );
      });
    });
  });
});
