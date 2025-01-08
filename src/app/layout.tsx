import "@/styles/globals.css";
import localFont from "next/font/local";
import Providers from "./providers/Providers";
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
          <main className='pb-[62px] desktop:pb-0'>{children}</main>
          <NavBar />
        </Providers>
      </body>
    </html>
  );
}
