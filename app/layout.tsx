import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Makertree",
  description: "Seus links em um só lugar",
  icons: {
      icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className=" min-h-screen flex flex-1 justify-between flex-col">
        {children}
        <Footer/>
      </body> 
    </html>
  );
}
