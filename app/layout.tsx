import type { Metadata } from "next";
import { DM_Sans, GFS_Didot, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const gfsDidot = GFS_Didot({
  weight: "400",
  subsets: ["greek"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
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
      className={`${gfsDidot.variable} ${dmSans.variable} ${shipporiMincho.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
