"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import DataTable from "@/components/DataTable";
import TransactionsComponent from "@/components/TransactionsComponent";
import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/api/transaction";
import Loader from "@/components/Loader";
import { CSVLink } from "react-csv";
import { useAppSelector } from "@/store/hooks";
const Transactions = () => {
  const state = useAppSelector((state) => state.transactions)  
  const isLoading = state.transactions.status === "loading"
  const isError = state.transactions.status === "error"
  const data = state.transactions.data

  if (isLoading)
    return (
      <Center w="full" h="100vh">
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

  const csvData = data.map((item: TransactionApiResponse) => ({
    Amount: `₦${item.amount.toLocaleString()}`,
    "Transaction ID": `TR_${
      (item?.transaction_id?.$oid as string) || item?.transaction_id || ""
    }`,
    "Transaction Type": item.transaction_type,
    Date: item.date,
    Time: item.time,
    Status: item.status,
  }));

  return (
    <Box w="full" bg="#FFF" pb="38px">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="start"
        justify="space-between"
        w="full"
        h={{ md: "91.72px" }}
      >
        {/* desktop */}
        <Flex
          borderBottom="2px solid"
          borderColor="#E6EAEE"
          boxShadow="sm"
          justify="space-between"
          w="full"
          align="center"
          minW={{ md: "calc(100vw - 263px)" }}
          px={{ base: 4, md: 10 }}
          pt="24px"
          pb="16px"
          flexWrap="wrap"
        >
          <Select
            name="filter"
            id="filter"
            h="auto"
            border="none"
            outline="none"
            maxW="max-content"
            minW="max-content"
            fontSize="16px"
            fontWeight={500}
            pos="relative"
            mb={{ base: "-2.5rem", md: "unset" }}
          >
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
              justify={{ base: "end", md: "start" }}
            >
              <Text fontWeight="500" whiteSpace="nowrap">
                Select Date Range:
              </Text>
              <Button
                border="1px solid"
                borderColor="#D0D5DD"
                rounded="8px"
                bg="#fff"
                color="#71717A"
                h="40px"
                px={4}
                gap={2}
                leftIcon={<LuCalendarDays />}
                fontSize="14px"
                w="full"
                maxW="253px"
              >
                June 6, 2023 - Jun 15, 2023
              </Button>
            </Flex>
            <CSVLink
              data={csvData}
              filename={"transactions.csv"}
              style={{ textDecoration: "none" }}
            >
              <Button
                border="1px solid"
                borderColor="#D0D5DD"
                bg="#FFF"
                rounded="8px"
                color="#344054"
                w="full"
                maxW="105px"
                h="40px"
                gap={2}
                fontSize="14px"
                px={4}
                leftIcon={<FiUploadCloud />}
              >
                Export
              </Button>
            </CSVLink>
          </Flex>
        </Flex>
      </Flex>
      <Box display={{ base: "none", lg: "flex" }} w="full" h="525px" mx="auto">
        <DataTable transactions={data} />
      </Box>
      <Box display={{ base: "block", lg: "none" }} w="full" h="full" mx="auto">
        <TransactionsComponent transactions={data} />
      </Box>
    </Box>
  );
};

export default Transactions;
