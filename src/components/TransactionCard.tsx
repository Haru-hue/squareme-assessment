import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";

interface TransactionDetails {
  amount: number;
  transaction_type: string;
  date: string;
  time: string;
  status: string;
}

const TransactionCard = ({ details }: { details: TransactionDetails }) => {
  return (
    <Box borderWidth="1px" w="full" rounded="md" p={2}>
      <VStack spacing={2} align="stretch">
        <Flex
          borderBottomWidth="1px"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize="xs">Amount:</Text>
          <Text fontSize="xs">₦ {details?.amount}</Text>
        </Flex>
        <Box
          borderBottomWidth="1px"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize="xs">Transaction type:</Text>
          <Text fontSize="xs">{details?.transaction_type}</Text>
        </Box>
        <Box
          borderBottomWidth="1px"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize="xs">Date:</Text>
          <Text fontSize="xs">
            {`${formatDate(details?.date ?? "")} ${details?.time}`.trim()}
          </Text>
        </Box>
        <Box
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize="xs">Status:</Text>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            minW="64px"
            px={3}
            py={1}
            rounded="full"
            borderWidth="1px"
            fontSize="xs"
            color={details?.status === "processed" ? "#5DC090" : "#F14156"}
            bg={details?.status === "processed" ? "#EFFDED" : "#FEECEE"}
            borderColor={
              details?.status === "processed" ? "#5DC090" : "#F14156"
            }
          >
            <Box w={2} h={2} rounded="full" bg="currentColor" mr={2} />
            {details?.status}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default TransactionCard;
