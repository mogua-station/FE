import "@/styles/globals.css";
import localFont from "next/font/local";
import Providers from "./providers/Providers";
import Header from "@/components/common/Header";
import NavBar from "@/components/common/nav-bar/NavBar";

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
      <body className='flex min-h-[100dvh] flex-col'>
        <Header />
        <main className='flex flex-1 flex-col pb-[62px] pt-[56px] desktop:pb-0'>
          {children}
        </main>
        <NavBar />
      </body>
    </html>
  );
}
