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
  title: "VAANAM | Chattogram — Contemporary Coastal Culinary Experience",
  description: "An interactive editorial dining journey through Chattogram's coastal culinary heritage, slow-cooked feasts, and artisanal spice traditions.",
  keywords: ["VAANAM", "Chattogram", "Bangladesh Cuisine", "Coastal Dining", "Mezbani Feast", "Kala Bhuna", "Shorshe Ilish", "Singara", "Editorial Food Experience"],
  openGraph: {
    title: "VAANAM | Chattogram — Contemporary Coastal Culinary Experience",
    description: "An interactive editorial dining journey through Chattogram's coastal culinary heritage, slow-cooked feasts, and artisanal spice traditions.",
    images: [{ url: "/images/IMAGE 01 — HERO.jpg", width: 1920, height: 1080 }],
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
      className={`${fraunces.variable} ${inter.variable} antialiased selection:bg-[#2B2320] selection:text-[#FAFAF8]`}
    >
      <body className="min-h-screen bg-[#FAFAF8] text-[#2B2320] font-sans overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
