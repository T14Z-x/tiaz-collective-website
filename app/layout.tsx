import type { Metadata } from "next";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  Shippori_Mincho,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiaz — Photography & Motion Portfolio",
  description:
    "Personal visual portfolio of photography, short films, and quiet frames captured on the road.",
  openGraph: {
    title: "Tiaz — Photography & Motion Portfolio",
    description:
      "Personal visual portfolio of photography, short films, and quiet frames captured on the road.",
    type: "website",
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
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${shipporiMincho.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
