"use client";
import "./globals.css";
import '@mantine/core/styles.css';
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from '@mantine/core';
import LayoutView from "./view";
import customTheme from "@/theme";
import Head from "next/head";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>My App</title>
        <meta name="description" content="This is my app description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="antialiased">
        <ChakraProvider theme={customTheme}>
          <MantineProvider>
            <QueryClientProvider client={queryClient}>
              <LayoutView>{children}</LayoutView>
            </QueryClientProvider>
          </MantineProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
