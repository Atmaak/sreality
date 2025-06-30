import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeWrapper from '@/components/ThemeWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SReality - Real Estate Platform",
  description: "Find your perfect property with SReality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <ThemeWrapper>
              <Header />
              {children}
            </ThemeWrapper>
        </body>
      </html>
    </ThemeProvider>
  );
}
