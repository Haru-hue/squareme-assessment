import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  DashboardIcon,
  GlobeIcon,
  SettingsIcon,
  TransactionIcon,
  TransferIcon,
  WalletIcon,
} from "@/assets";
import NotificationIcon from "@/assets/bell.svg"
import Logo from "@/assets/Logo.png"

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      w='100%'
      h="20"
      bg="white"
      color="black"
      borderBottom="1px"
      borderColor="#E6EAEE"
      px={{ base: "25px", md: "9" }}
      shadow="sm"
      position="fixed"
    >
      <Flex justify="space-between" align="center" h="full">
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          aria-label="menu"
        />

        {/* NavMenu */}
        {isOpen && (
          <Box
            position="fixed"
            bg="white"
            h="100vh"
            w="65vw"
            top="20"
            left="0"
            zIndex="50"
            shadow="lg"
            transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
            transition="transform 0.3s ease-in-out"
          >
            <List spacing={2}>
              {sideNav.map((item) => (
                <ListItem key={item.name} h="16" onClick={onClose}>
                  <Link
                    href={`/${item.link}`}
                    display="flex"
                    alignItems="center"
                    pl="34px"
                    py="14.5px"
                    w="full"
                    textTransform="capitalize"
                    fontSize="15px"
                  >
                    <Box as="span" mr="3">
                      {item.icon}
                    </Box>
                    <Box as="span">{item.name}</Box>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

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
            <Image
              src="/down.svg"
              alt="arrow-down"
              w="8px"
              h="4.76px"
              display={{ base: "none", md: "block" }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
