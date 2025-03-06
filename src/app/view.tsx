import { ReactNode } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import Navbar from "@/components/Navigation/navbar";
import SideBar from "@/components/Navigation/sidebar";

const LayoutView = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" w="100%" h="100%" fontFamily="Inter" bg="#FFF">
      <Navbar />
      <Flex w="full" h="full" pt="20">
        <SideBar />
        <Stack w='full' justify='center' align='center'>
            <Box w='full' mx='auto' maxW={{ xl: '80rem' }}>
              {children}
            </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default LayoutView;
