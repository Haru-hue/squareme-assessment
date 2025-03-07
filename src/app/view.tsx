"use client";
import { ReactNode } from "react";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Navbar from "@/components/Navigation/navbar";
import SideBar from "@/components/Navigation/sidebar";

const LayoutView = ({ children }: { children: ReactNode }) => {
  const navbarModal = useDisclosure();

  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      fontFamily="Inter !important"
      bg="#FFF"
    >
      <Navbar navbarModal={navbarModal} />
      <Flex w="full" h="full" pt="20">
        <SideBar navbarModal={navbarModal} />
        <Stack w="full" justify="center" align="center" ml={{ lg: "263px" }}>
          {children}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LayoutView;
