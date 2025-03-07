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
  useMediaQuery,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const SideBar = ({ navbarModal }: { navbarModal: UseDisclosureProps }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const handleClose = navbarModal?.onClose ?? (() => {});

  return (
    <>
      {isMobile ? (
        <Drawer
          isOpen={navbarModal?.isOpen ?? false}
          onClose={handleClose}
          autoFocus={false}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent bg="white"
          borderRight="1px solid"
          borderColor="#E6EAEE">
            <SideBarContent />
          </DrawerContent>
        </Drawer>
      ) : (
        <Box
          position="fixed"
          flexDirection="column"
          minW="263px"
          minH="100vh"
          bg="white"
          borderRight="1px solid"
          borderColor="#E6EAEE"
        >
          <SideBarContent/>
        </Box>
      )}
    </>
  );
};

const SideBarContent = () => {
  const pathname = usePathname(); // Get the current path
  const sideNav = [
    { name: "get started", icon: <GlobeIcon />, link: "/" },
    { name: "dashboard", icon: <DashboardIcon />, link: "#" },
    { name: "accounts", icon: <WalletIcon />, link: "#" },
    { name: "transfers", icon: <TransferIcon />, link: "#" },
    { name: "transactions", icon: <TransactionIcon />, link: "/transactions" },
    { name: "settings", icon: <SettingsIcon />, link: "#" },
  ];

  return (
    <Flex w="full" h="full">
      <List w="full" pt="32px">
        {sideNav.map((item) => (
          <ListItem key={item.name} w="full" maxH="max-content">
            <ChakraLink
              href={item.link}
              display="flex"
              alignItems="center"
              justifyContent="start"
              gap="3"
              pl="34px"
              py="14.5px"
              w="full"
              textTransform="capitalize"
              fontSize="15px"
              fontFamily='Inter'
              bg={pathname === item.link
                  ? "#3976E8"
                  : "transparent"
              }
              color={pathname === item.link
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
  );
};

export default SideBar;
