import "@/styles/globals.css";
import { type Metadata } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Providers from "./providers/Providers";
import HeaderWrapper from "@/components/common/layout/HeaderWrapper";
import NavBarWrapper from "@/components/common/layout/NavBarWrapper";
import InitializeUser from "@/hooks/auths/InitializeUser";

const ClearImageOnPageLeave = dynamic(
  () => import("@/hooks/inputs/images/useLeavePage"),
  {
    ssr: false,
  },
);

const BackgroundWrapper = dynamic(
  () => import("@/components/common/layout/BackgroundWrapper"),
);

const pretendard = localFont({
  src: "/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
});

export const metadata: Metadata = {
  title: "모과 | 스터디 & 과외 매칭 플랫폼",
  description:
    "모과(mogua)는 스터디 및 과외 모임을 쉽게 만들고 참여할 수 있는 플랫폼입니다. 원하는 과목과 지역에 맞춰 최적의 학습 파트너를 찾아보세요.",
  keywords:
    "스터디, 과외, 스터디 모집, 과외 모집, 그룹 스터디, 온라인 스터디, 오프라인 스터디, 공부 모임, 학습, 교육, 과외 플랫폼",
  openGraph: {
    title: "모과 | 스터디 및 과외 매칭 플랫폼",
    description:
      "스터디와 과외 모임을 쉽고 빠르게 찾아보세요. 원하는 과목과 지역에 맞는 학습 파트너를 연결해드립니다.",
    url: "https://mogua.vercel.app/",
    type: "website",
    locale: "ko_KR",
    siteName: "mogua",
    // images: [
    //   {
    //     url: "/images/meta.webp",
    //     alt: "모과(mogua) - 스터디 및 과외 매칭 플랫폼",
    //   },
    // ],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://mogua.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko-KR' className={pretendard.className}>
      <body className='flex min-h-[100dvh] flex-col overflow-x-hidden bg-gray-950 scrollbar:w-1 scrollbar:bg-transparent scrollbar-thumb:rounded-full scrollbar-thumb:bg-orange-300'>
        <Providers>
          <InitializeUser />
          <ClearImageOnPageLeave />
          <HeaderWrapper />
          <main className='relative flex flex-grow flex-col'>{children}</main>
          <NavBarWrapper />
          <BackgroundWrapper />
        </Providers>
      </body>
    </html>
  );
}
