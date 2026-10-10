import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppToaster from "@/components/Toaster";
export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারদর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
