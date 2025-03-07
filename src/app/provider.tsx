"use client"
import { store } from "@/store";
import customTheme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import React, { ReactNode } from "react";
import LayoutView from "./view";
import { Provider as ReduxProvider } from "react-redux";

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ChakraProvider theme={customTheme}>
        <MantineProvider>
          <ReduxProvider store={store}>
          <LayoutView>
                <React.StrictMode>{children}</React.StrictMode>
              </LayoutView>
          </ReduxProvider>
        </MantineProvider>
      </ChakraProvider>
    )

}

export default Provider;