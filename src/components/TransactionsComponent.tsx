import { Box, Heading, VStack } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";

const TransactionsComponent = ({
  transactions,
}: {
  transactions: TransactionApiResponse[];
}) => {
  return (
    <Box w="full" h="full" px={6} pt={10}>
      <Heading fontFamily='Inter' size="md" mb={3}>
        Transactions
      </Heading>
      <VStack w='full' spacing={5} align="start">
        {transactions?.map((item, i) => (
          <TransactionCard key={i} details={item} />
        ))}
      </VStack>
    </Box>
  );
};

export default TransactionsComponent;
