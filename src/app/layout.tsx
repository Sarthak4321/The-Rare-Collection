import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "The Rare Collection | Bespoke Date Planning",
  description: "Crafting cinematic stories from your matching sparks.",
};

import { Toaster } from "sonner";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            richColors
            closeButton
            theme="light"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                color: '#1e293b',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
