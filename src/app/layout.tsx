import "@/styles/globals.css";
import localFont from "next/font/local";
import Providers from "./providers/Providers";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/nav-bar/NavBar";
import InitializeUser from "@/hooks/auths/InitializeUser";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko-KR' className={pretendard.className}>
      <body className='flex min-h-[100dvh] flex-col bg-gray-950 scrollbar:w-1 scrollbar:bg-transparent scrollbar-thumb:rounded-full scrollbar-thumb:bg-orange-300'>
        {/* 배경 비디오 임시설정 */}
        <video
          className='fixed inset-0 -z-10 size-full object-cover'
          src='/videos/background.mp4'
          loop
          autoPlay
          muted
          preload='auto'
          playsInline
        />
        <Providers>
          <InitializeUser />
          <Header />
          <main className='relative flex flex-1 flex-col pb-[62px] pt-[56px] desktop:pb-0'>
            {children}
          </main>
          <NavBar />
        </Providers>
      </body>
    </html>
  );
}
