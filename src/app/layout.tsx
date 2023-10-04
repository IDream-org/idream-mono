import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SimpleSnackbar from "@/components/SimpleSnackBar/SimpleSnackBar";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collections",
  description: "Create your own collections",
  manifest: "/manifest.json",
  icons: { apple: "/icon-192x192.png" },
  themeColor: "#3573f6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Providers>
            <SimpleSnackbar />
            {children}
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
