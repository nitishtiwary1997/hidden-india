import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Hidden India - Discover the India Beyond Tourist Maps",
  description: "Discover offbeat places, waterfalls, ancient ruins, temples, local foods, and folklore across India's lesser-known districts.",
  keywords: "hidden india, offbeat travel, travel india, waterfalls, ancient temples, local villages, travel guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F19] dark:text-[#F1F5F9] antialiased min-h-screen flex flex-col`}>
        <AppProvider>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
