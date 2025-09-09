import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ClientThemeWrapper from "@/app/context/ClientThemeWrapper";
import React from "react";

export const metadata: Metadata = {
  openGraph: {
    title: "PROOF-OF-WORK MINING",
    description:
      "XENBLOCKS SERVE AS A PROOF-OF-WORK (POW) TOKEN ON THE X1 BLOCKCHAIN",
    url: "https://explorer.xenblocks.io",
    type: "website",
    images: [
      {
        url: "https://xenblocks.ai/xenblocks-logo.png",
        width: 800,
        height: 156,
        alt: "Xenblocks Logo",
      },
    ],
  },
  twitter: {
    creator: "@XEN_Crypto",
  },
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
