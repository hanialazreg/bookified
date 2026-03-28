import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans} from "next/font/google";
import "./globals.css";
import React from "react";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Bookefied",
  description: "Transform your book into an interactive AI conversation , upload your PDF and chat with your book using your voice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
