import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AIDA Digital Assistant (AI-Powered Government Services)",
  description: "Your Digital Counter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
      <Script
          defer
          src="https://umami-analytics-gules.vercel.app/script.js"
          data-website-id="58445ba7-67e1-49bc-9ac0-e9ff730d1ed4"
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090b1a]`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
