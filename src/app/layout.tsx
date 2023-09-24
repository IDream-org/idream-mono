import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SimpleSnackbar from "@/components/SimpleSnackBar/SimpleSnackBar";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Categories",
  description: "Create your own categories",
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
