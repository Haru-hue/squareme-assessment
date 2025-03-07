"use client"
import {
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  UseDisclosureReturn,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NotificationIcon from "@/assets/bell.svg";
import Logo from "@/assets/Logo.png";
import { FaArrowLeft } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
const Navbar = ({ navbarModal }: { navbarModal: UseDisclosureReturn }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const pathname = usePathname();
  const noTitle = pathname === "/transactions";
  return (
    <Stack
      w="full"
      h={{ base: "60px", md: "80px" }}
      bg="white"
      color="black"
      borderBottom="1px solid"
      borderColor="#E6EAEE"
      px={{ base: "25px", md: "9" }}
      shadow="sm"
      position="fixed"
      justify="center"
      zIndex={50}
    >
      {noTitle && isMobile ? (
        <Flex
          align="center"
          gap="12px"
          as={Link}
          href="/"
          textDecoration="none"
          _hover={{
            textDecor: "none",
            color: "black",
          }}
        >
          <FaArrowLeft />
          <Text fontWeight={500}>Transactions</Text>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" h="full">
          <Box onClick={navbarModal?.onToggle}>
            {navbarModal?.isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Box>
          <Image src={Logo.src} alt="logo" />
          <Flex gap={{ base: "2", md: "4" }} align="center">
            <Image
              src={NotificationIcon.src}
              alt="bell"
              w={{ base: "4", md: "24px" }}
              h={{ base: "4", md: "24px" }}
            />
            <Flex gap="7px" align="center">
              <Box
                w={{ base: "8", md: "50px" }}
                h={{ base: "8", md: "50px" }}
                fontSize={{ base: "10.24px", md: "base" }}
                rounded="full"
                bg="#0CBC8B"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="medium"
              >
                GA
              </Box>
              <Box display={{ base: "none", lg: "block" }}>
                <IoMdArrowDropdown />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
};

export default Navbar;
