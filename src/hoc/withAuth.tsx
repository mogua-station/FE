"use client";

import useRedirectIfUnsigned from "@/hooks/auths/useRedirectIfUnsigned";
import useCookie from "@/hooks/auths/useTokenState";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const token = useCookie("accessToken");

    useRedirectIfUnsigned(token);

    if (!token) {
      return null; // 또는 로딩 컴포넌트
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
