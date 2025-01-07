import "@/styles/globals.css";
import localFont from "next/font/local";
import Header from "@/components/common/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
