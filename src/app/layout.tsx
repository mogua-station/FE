import "@/styles/globals.css";

export default function RootLayout({
  children,
}: { children: React.ReactNode; } ) {
  return (
    <html lang='ko-kr'>
      <body>
        {children}
      </body>
    </html>
  );
}
