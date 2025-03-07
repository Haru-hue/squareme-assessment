"use client";
import { ReactNode } from "react";
import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import Navbar from "@/components/Navigation/navbar";
import SideBar from "@/components/Navigation/sidebar";

const LayoutView = ({ children }: { children: ReactNode }) => {
  const navbarModal = useDisclosure();

  return (
    <Flex direction="column" w="100%" h="100%" fontFamily="Inter" bg="#FFF">
      <Navbar navbarModal={navbarModal} />
      <Flex w="full" h="full" pt="20">
        <SideBar navbarModal={navbarModal} />
        <Stack w="full" justify="center" align="center" ml={{ lg: "263px" }}>
          <Box w="full">{children}</Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LayoutView;
