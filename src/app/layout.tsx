"use client";

import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeContext";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

import { usePathname } from "next/navigation";

// Define fonts
const blanka = localFont({
  src: "../../public/fonts/Blanka-Regular.woff",
  variable: "--font-title",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProjectRoute = pathname?.includes("/projects/") || false;
  return (
    <html lang="en" className={blanka.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=hind@300,400,500,600,700,1&f[]=poppins@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901,1,2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Don't include transitions for project routes */}
          {!isProjectRoute ? (
            <>
              <StairTransition />
              <PageTransition>{children}</PageTransition>
            </>
          ) : (
            // Render children directly without transitions for project routes
            children
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
