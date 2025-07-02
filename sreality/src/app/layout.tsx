import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from '@/components/Header'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeWrapper from '@/components/ThemeWrapper'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SReality - Find Your Perfect Property | Real Estate Platform",
  description: "Discover your dream home with SReality. Browse thousands of properties, apartments, and houses for sale and rent in Czech Republic. Professional real estate platform with advanced search and filtering options.",
  keywords: "real estate, property, apartments, houses, Czech Republic, buy, rent, sreality",
  authors: [{ name: "Kubjak" }],
  creator: "Kubjak",
  publisher: "SReality",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SReality - Find Your Perfect Property",
    description: "Discover your dream home with SReality. Browse thousands of properties in Czech Republic.",
    url: 'https://your-domain.com',
    siteName: 'SReality',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SReality - Real Estate Platform',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SReality - Find Your Perfect Property",
    description: "Discover your dream home with SReality. Browse thousands of properties in Czech Republic.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <html lang="cs">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </head>
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
  )
}
