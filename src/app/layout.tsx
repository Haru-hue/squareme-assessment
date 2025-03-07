import "./globals.css";
import "@mantine/core/styles.css";
import React from "react";
import Provider from "./provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joshua Uko - SquareMe Assessment"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
      <Provider>{children}</Provider>

      </body>
    </html>
  );
}
