import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ClientThemeWrapper from "@/app/context/ClientThemeWrapper";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "XENBLOCKS",
  description: "PROOF-OF-WORK MINING ACCESSIBLE TO EVERYONE",
  // add meta tags here
  icons: [
    // { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    // { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ClientThemeWrapper>{children}</ClientThemeWrapper>
        </ThemeProvider>
      </body>
      {/*<GoogleAnalytics gaId="G-VBPT50SHRY" />*/}
    </html>
  );
}
