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
      <body>
        <Providers>
          <Header />
          <main className='desktop:pb-0 pb-[62px] pt-[56px]'>{children}</main>;
          <NavBar />
        </Providers>
      </body>
    </html>
  );
}
