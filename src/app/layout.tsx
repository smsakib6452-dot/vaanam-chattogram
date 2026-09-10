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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "VAANAM Chattogram",
  description:
    "Coastal Feasts & Artisanal Cha Studio celebrating Chattogram's coastal culinary heritage, slow-cooked Mezbani feasts, and artisanal clay cup tea culture.",
  image: "https://vaanam-chattogram.com/assets/photos/img-kulhad-hero.jpg",
  servesCuisine: [
    "Bengali",
    "Chattogram Coastal",
    "Mezbani Heritage",
    "Artisanal Tea Atelier",
    "Filter Coffee",
  ],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "GEC Circle & Batali Hill Trail",
    addressLocality: "Chattogram",
    addressRegion: "Chattogram Division",
    postalCode: "4000",
    addressCountry: "BD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.3569,
    longitude: 91.8214,
  },
  telephone: "+8801819822626",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:30",
      closes: "23:00",
    },
  ],
  acceptsReservations: "True",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
