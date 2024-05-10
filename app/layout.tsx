import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/app/context/ThemeContext";
import ClientThemeWrapper from "@/app/context/ClientThemeWrapper";
import Footer from "@/app/components/Footer";
import React from "react";

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "solXEN Leaderboard",
  description: "",
  // add meta tags here
  icons: [
    {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
    {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
  ],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>

    <ThemeProvider>
    <ClientThemeWrapper>
      {children}
      <Footer/>
    </ClientThemeWrapper>
    </ThemeProvider>

    </body>
    </html>
  );
}
