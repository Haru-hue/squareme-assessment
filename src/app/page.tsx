"use client";
import {
  Box,
  Flex,
  Text,
  Select,
  Center,
  VStack,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchBarChartData } from "@/api/transaction";
import { BsCopy } from "react-icons/bs";
import { useState } from "react";
import Loader from "@/components/Loader";
import { BarChart } from "@/components/BarChart";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["barChart"],
    queryFn: fetchBarChartData,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // 1 minute
  });
  const [activeFilter, setActiveFilter] = useState("Last 7 days");

  if (isLoading)
    return (
      <Center h='100vh'>
        <Loader />
      </Center>
    );

  if (error) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : error.message || "An unknown error occurred";
    return (
      <Center w="full" mt={4} p={4}>
        <VStack
          maxW="sm"
          w="full"
          bg="#ffe6d3"
          color="#ff892f"
          rounded="lg"
          shadow="lg"
          p={6}
          spacing={2}
        >
          <Text fontSize="lg" fontWeight="semibold">
            {errorMessage}
          </Text>
          <Text fontSize="sm">
            Please try reloading the page or check your network connection. If
            the issue persists, feel free to reach out. 😥
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box w="full" h="full" py={{ base: 6, lg: 12 }} px={6}>
      <Flex
        w="full"
        borderBottom="1px solid"
        borderColor="#E6EAEE"
        pl={{ base: 6, md: 9 }}
      >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="semibold"
          borderBottom="2px solid"
          borderColor="#3976E8"
          pb={5}
        >
          Online Payments
        </Text>
      </Flex>
      <Stack>
        <Box w="full" py={{ base: 6, md: 12 }}>
          <Box
            w="325px"
            h="128px"
            p={5}
            bg="white"
            border="1px"
            borderColor="#E4E4E7"
            rounded="md"
          >
            <Text fontSize="xs" color="#8F8E8E" textTransform="uppercase">
              Account Details
            </Text>
            <Text fontSize="xs" textTransform="uppercase">
              STERLING BANK
            </Text>
            <Flex justify="space-between" align="center" h={7}>
              <Text fontSize="2xl" fontWeight="bold">
                8000000000
              </Text>
              <Button
                size="sm"
                bg="#9F56D433"
                color="#9F56D4"
                rounded="md"
                leftIcon={<BsCopy color="#9F56D4" />
                }
              >
                Copy
              </Button>
            </Flex>
            <Text fontSize="xs" mt={1} display={{ base: "block", md: "none" }}>
              OGEDENGBE FRUITS STORE
            </Text>
          </Box>
        </Box>
        <Stack
          display={{ base: "none", lg: "flex" }}
          bg="#FAFAFA"
          border="1px"
          borderColor="#E4E4E7"
          rounded="lg"
          p={6}
          w='full'
        >
          <Flex justify="space-between" mb={6}>
            <HStack spacing={6}>
              <Text fontSize="sm" fontWeight="semibold" color="#71717A">
                Showing data for
              </Text>
              <Select
                w="154px"
                h="42px"
                fontSize="sm"
                fontWeight="semibold"
                borderColor="#DADAE7"
                rounded="md"
              >
                <option value="Last 7 days">Last 7 days</option>
                <option value="Today">Today</option>
                <option value="Last 30 days">Last 30 days</option>
              </Select>
            </HStack>
            <HStack spacing={4}>
              <Button
                variant="outline"
                onClick={() => setActiveFilter("today")}
                bg={activeFilter === "today" ? "#00C6FB0F" : "transparent"}
              >
                Today
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveFilter("Last 7 days")}
                bg={
                  activeFilter === "Last 7 days" ? "#00C6FB0F" : "transparent"
                }
              >
                Last 7 days
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveFilter("Last 30 days")}
                bg={
                  activeFilter === "Last 30 days" ? "#00C6FB0F" : "transparent"
                }
              >
                Last 30 days
              </Button>
            </HStack>
          </Flex>
          <Box
            w="full"
            h="full"
            bg="white"
            border="1px"
            borderColor="#E4E4E7"
            rounded="md"
            p={6}
          >
            <HStack spacing={3}>
              <Text fontSize="sm" fontWeight="bold" color="#424242">
                Revenue
              </Text>
              <Text fontSize="sm" color="#6DC27F">
                +0.00% vs Last 7 days
              </Text>
            </HStack>
            <HStack mb={6}>
              <Text fontSize="4xl" fontWeight="bold">
                ₦0.00
              </Text>
              <Text fontSize="sm">in total value</Text>
            </HStack>
            <Box w="full" h="full">
              <BarChart value={data ?? []} />
            </Box>
          </Box>
        </Stack>
      </Stack>

      {/* mobile */}
      <Stack
        display={{ lg: "none" }}
        mx="auto"
        h="279px"
        bg="white"
        border="1px"
        borderColor="#C4C8D3"
        rounded="md"
        p={4}
      >
        <Flex justify="space-between" w="full" mb={4}>
          <Text>Revenue</Text>
          <Select
            h="30px"
            fontSize="xs"
            border='1px solid'
            borderColor="#C4C8D3"
            rounded="full"
            maxW='max-content'
          >
            <option value="weekly">Weekly</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
          </Select>
        </Flex>
        <Box w="full" h="full">
          <BarChart value={data ?? []} />
        </Box>
      </Stack>
    </Box>
  );
}
