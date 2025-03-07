"use client";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutView from "./view";
import customTheme from "@/theme";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ChakraProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <LayoutView>{children}</LayoutView>
          </QueryClientProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
