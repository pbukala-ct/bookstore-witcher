import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Witcher Library | Official Book Collection",
  description: "Explore the complete Witcher book series by Andrzej Sapkowski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <CartProvider>
          <Header />
          <div className="min-h-screen">
            {children}
          </div>
          <footer className="py-6 border-t border-[#3a3a3a] mt-10">
            <div className="container mx-auto text-center text-sm text-[#a0a0a0]">
              <p>© {new Date().getFullYear()} The Witcher Library. All rights reserved.</p>
              <p className="mt-1">Books by Andrzej Sapkowski.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}