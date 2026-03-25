import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "../public/Satoshi-Regular.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RevAI | Revenue Intelligence",
  description: "AI-Powered Revenue Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased dark`}>
      <body className="font-sans min-h-full flex flex-col">{children}</body>
    </html>
  );
}
