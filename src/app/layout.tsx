import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Rare Collection | Bespoke Date Planning",
  description: "Crafting cinematic stories from your matching sparks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
