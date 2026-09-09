import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaanam-chattogram.com"),
  title: "VAANAM | Coastal Feasts & Artisanal Cha Studio, Chattogram",
  description: "An interactive editorial journey celebrating Chattogram's coastal culinary heritage, slow-cooked Mezbani feasts, and artisanal clay cup tea culture.",
  keywords: [
    "VAANAM",
    "Chattogram",
    "Bangladesh Cuisine",
    "Matir Kulhad Chai",
    "Mezbani Feast",
    "Kala Bhuna",
    "Singara",
    "Shahi Jilapi",
    "Filter Coffee",
    "Editorial Food Experience",
  ],
  openGraph: {
    title: "VAANAM | Coastal Feasts & Artisanal Cha Studio, Chattogram",
    description: "An interactive editorial journey celebrating Chattogram's coastal culinary heritage, slow-cooked Mezbani feasts, and artisanal clay cup tea culture.",
    images: [{ url: "/assets/photos/img-kulhad-hero.jpg", width: 1920, height: 1080 }],
  },
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
      className={`${fraunces.variable} ${inter.variable} antialiased selection:bg-[#2B2320] selection:text-[#FAFAF8]`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAFAF8] text-[#2B2320] font-sans overflow-x-hidden relative"
      >
        {children}
      </body>
    </html>
  );
}
