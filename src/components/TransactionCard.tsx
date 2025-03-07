import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";

const TransactionCard = ({ details }: { details: TransactionApiResponse }) => {
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
          <Text fontSize={{ base: '12px', md: '14px' }}>Amount:</Text>
          <Text fontSize={{ base: '12px', md: '14px' }}>₦ {details?.amount?.toLocaleString()}</Text>
        </Flex>
        <Box
          borderBottomWidth="1px"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize={{ base: '12px', md: '14px' }}>Transaction type:</Text>
          <Text fontSize={{ base: '12px', md: '14px' }}>{details?.transaction_type}</Text>
        </Box>
        <Box
          borderBottomWidth="1px"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Text fontSize={{ base: '12px', md: '14px' }}>Date:</Text>
          <Text fontSize={{ base: '12px', md: '14px' }}>
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
          <Text fontSize={{ base: '12px', md: '14px' }}>Status:</Text>
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            minW="64px"
            px={3}
            py={1}
            rounded="full"
            borderWidth="1px"
            fontSize={{ base: '12px', md: '14px' }}
            color={details?.status === "processed" ? "#5DC090" : "#F14156"}
            bg={details?.status === "processed" ? "#EFFDED" : "#FEECEE"}
            borderColor={
              details?.status === "processed" ? "#5DC090" : "#F14156"
            }
            textTransform='capitalize'
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
