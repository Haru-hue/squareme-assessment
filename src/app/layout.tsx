"use client"
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutView from "./view";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LayoutView>
          <ChakraProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </ChakraProvider>
        </LayoutView>
      </body>
    </html>
  );
}
