import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box data-testid="loader" display="flex" w="full" alignItems="center" justifyContent="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="#3976E8" />
    </Box>
  );
};

export default Loader;
