"use client";
 import { Box, Button, Center, Flex, Select, Text, VStack } from "@chakra-ui/react";
import DataTable from "@/components/DataTable";
import TransactionsComponent from "@/components/TransactionsComponent";
import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/api/transaction";
import Loader from "@/components/Loader";

const Transactions = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // 1 minute
  });

  if (isLoading)
    return (
      <Center w="full" h="40vh">
        <Loader />
      </Center>
    );
  if (isError) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : error.message || "An unknown error occurred";
    return (
      <Center w="full" mt={4}>
        <Box
          maxW="sm"
          w="full"
          bg="#ffe6d3"
          color="#ff892f"
          p={4}
          rounded="lg"
          shadow="lg"
        >
          <VStack spacing={2} py={4} px={6}>
            <Text fontSize="lg" fontWeight="semibold">
              {errorMessage}
            </Text>
            <Text fontSize="sm" textAlign="start">
              Please try reloading the page or check your network connection. If
              the issue persists, feel free to reach out. 😥
            </Text>
          </VStack>
        </Box>
      </Center>
    );
  }

  return (
    <Box w='full' bg='#FFF' pb='38px'>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="start"
        justify="space-between"
        w="full"
        borderBottom="1px"
        borderColor="#E6EAEE"
        p={{ base: "10px 25px", md: "36px 70px 0 70px" }}
        h={{ md: "91.72px" }}
      >
        {/* desktop */}
        <Flex justify="space-between" w="full" align="center">
          <Select name="filter" id="filter" h="auto">
            <option value="">All Accounts</option>
            <option value="">Transactions</option>
            <option value="">Last 30 days</option>
          </Select>
          <Flex
            w="auto"
            align="center"
            gap={4}
            justify="end"
            textStyle="sm"
            wrap={{ base: "wrap-reverse", md: "nowrap" }}
          >
            <Flex
              align="center"
              gap={3}
              w="full"
              textColor="#71717A"
              display={{ base: "none", sm: "flex" }}
            >
              <Text textStyle="base" fontWeight="medium">
                Select date range:
              </Text>
              <Button
                border="1px"
                borderColor="#D0D5DD"
                rounded="8px"
                textStyle="sm"
                h="40px"
                px={4}
                gap={2}
                leftIcon={<LuCalendarDays />}
              >
                June 6, 2023 - Jun 15, 2023
              </Button>
            </Flex>
            <Button
              border="1px"
              borderColor="#D0D5DD"
              rounded="8px"
              textColor="#344054"
              textStyle="sm"
              w="105px"
              h="40px"
              gap={2}
              leftIcon={<FiUploadCloud />}
            >
              Export
            </Button>
          </Flex>
        </Flex>
        {/* mobile */}
        <Flex
          align="center"
          justify="space-between"
          gap={3}
          w="full"
          textColor="#71717A"
          display={{ base: "flex", md: "none" }}
        >
          <Text textStyle="13px" fontWeight="medium">
            Select date range:
          </Text>
          <Button
            border="1px"
            borderColor="#D0D5DD"
            rounded="8px"
            textStyle="xs"
            w="203px"
            h="40px"
            px={4}
          >
            June 6, 2023 - Jun 15, 2023
          </Button>
        </Flex>
      </Flex>
      <Box display={{ base: "none", lg: "flex" }} w="1098.05px" h="525px" mx="auto">
        <DataTable transactions={data} />
      </Box>
      <Box display={{ base: "block", lg: "none" }} w="full" h="full" mx="auto">
        <TransactionsComponent transactions={data} />
      </Box>
    </Box>
  );
};

export default Transactions;

