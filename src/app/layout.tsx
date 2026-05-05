import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainWrapper from "@/components/wrapper/MainWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "smart-pos",
  description: "A modern point of sale application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased bg-[#F7F7F7]`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}