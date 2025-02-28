import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

<<<<<<< HEAD
=======
import { Analytics } from '@vercel/analytics/react'

import Navbar from "@/components/Navbar";

>>>>>>> 11a55becfcb4275dcc1f51026a0beea3f08eb7a6
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Data Science Club",
  description: "The Skyline College Data Science Club website! In collaboration with the GDG on Campus Skyline College Chapter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
=======
      <Analytics />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
>>>>>>> 11a55becfcb4275dcc1f51026a0beea3f08eb7a6
        {children}
      </body>
    </html>
  );
}
