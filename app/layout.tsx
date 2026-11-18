import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiaz Collective — Ideas find their form",
  description:
    "A multidisciplinary creative collective shaping thoughtful identities, stories, and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
