import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FLAT6 MEET 2025 — Il Raduno Esclusivo Porsche 911 GT3",
  description:
    "FLAT6 MEET è il raduno esclusivo dedicato alle Porsche 911 GT3 e GT3 RS. Percorsi selezionati, community reale, esperienza totale. Posti limitati — iscriviti ora.",
  keywords: [
    "Porsche 911 GT3",
    "GT3 RS",
    "raduno Porsche",
    "FLAT6 MEET",
    "motorsport",
    "track day",
    "flat-six",
  ],
  openGraph: {
    title: "FLAT6 MEET 2025 — Il Raduno Esclusivo Porsche 911 GT3",
    description:
      "Il raduno esclusivo per chi guida una 911 GT3. Percorsi selezionati. Scenari mozzafiato. Solo GT3.",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLAT6 MEET 2025 — Il Raduno Esclusivo Porsche 911 GT3",
    description:
      "Il raduno esclusivo per chi guida una 911 GT3. Percorsi selezionati. Scenari mozzafiato. Solo GT3.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="bg-[#0A0A0A] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
