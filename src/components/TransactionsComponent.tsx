import { Box, Heading, VStack } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";

const TransactionsComponent = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Box w="full" h="full" px={6} pt={10}>
      <Heading size="md" mb={3}>
        Transactions
      </Heading>
      <VStack spacing={5} align="start">
        {transactions?.map((item: Transaction, i: number) => (
          <TransactionCard key={i} details={item} />
        ))}
      </VStack>
    </Box>
  );
};

export default TransactionsComponent;
