"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useKakaoLogin } from "@/lib/auth/useKakaoLogin";

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { handleKakaoLogin, loading, error } = useKakaoLogin();
  const requestSent = useRef(false);

  useEffect(() => {
    if (code && !requestSent.current) {
      requestSent.current = true;
      handleKakaoLogin(code);
    }

    return () => {
      requestSent.current = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center'>{error}</div>
    );
  }

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        로그인 처리중...
      </div>
    );
  }

  return null;
};

export default KakaoCallbackPage;
