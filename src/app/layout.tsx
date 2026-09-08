import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Annu Shakya | Full-Stack Developer & AI Builder",
  description: "Annu Shakya is a Full-Stack Developer building modern web applications, AI-powered products, APIs and digital experiences for businesses and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-primary text-offwhite antialiased overflow-x-hidden font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
