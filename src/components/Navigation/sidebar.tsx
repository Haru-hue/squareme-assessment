import {
  DashboardIcon,
  GlobeIcon,
  SettingsIcon,
  TransactionIcon,
  TransferIcon,
  WalletIcon,
} from "@/assets";
import {
  Box,
  Flex,
  List,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname(); // Get the current path
  const sideNav = [
    { name: "get started", icon: <GlobeIcon />, link: "/" },
    { name: "dashboard", icon: <DashboardIcon />, link: "#" },
    { name: "accounts", icon: <WalletIcon />, link: "#" },
    { name: "transfers", icon: <TransferIcon />, link: "#" },
    { name: "transactions", icon: <TransactionIcon />, link: "transactions" },
    { name: "settings", icon: <SettingsIcon />, link: "#" },
  ];

  return (
    <Box
      display={{ base: "none", md: "flex" }}
      position="fixed"
      flexDirection="column"
      minW="263px"
      minH="100vh"
      bg="white"
      borderRight="1px"
      borderColor="#E6EAEE"
    >
      <Flex w="full" h="full">
        <List w="full" pt="32px">
          {sideNav.map((item) => (
            <ListItem key={item.name} w="full" maxH="max-content">
              <ChakraLink
                href={`/${item.link}`}
                display="flex"
                alignItems="center"
                justifyContent="start"
                gap="3"
                pl="34px"
                py="14.5px"
                w="full"
                textTransform="capitalize"
                fontSize="15px"
                bg={
                  pathname === `/${item.link}` || pathname === item.link
                    ? "#3976E8"
                    : "transparent"
                }
                color={
                  pathname === `/${item.link}` || pathname === item.link
                    ? "white"
                    : "#04004D"
                }
                _hover={{
                  textDecor: "none",
                }}
              >
                <Box as="span">{item.icon}</Box>
                <Box as="span">{item?.name}</Box>
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default SideBar;
