"use client";
import { useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Flex,
} from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";
import { Pagination } from "@mantine/core";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";

// Ensure API response is properly typed
const DataTable = ({ transactions }: { transactions: TransactionApiResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const formattedData =
    transactions?.map((item) => ({
      id: typeof item?.id === "string" ? item?.id : item?.id?.$oid || "",
      amount: item?.amount || 0,
      transaction_id: `TR_${
        item?.transaction_id?.$oid as string || item?.transaction_id || ""
      }`,
      transaction_type: item?.transaction_type || "",
      date: item?.date || "",
      time: item?.time || "",
      status: item?.status || "",
    })) || [];

    const itemsPerPage = 7
  // Pagination state

  // Calculate paginated data
  const totalPages = Math.ceil(formattedData.length / itemsPerPage);
  const paginatedData = formattedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Toggle row selection
  const allSelected =
    selectedRows.length === paginatedData.length && paginatedData.length > 0;

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((item) => item?.id));
    }
  };

  return (
    <Box w="full" h="full" p={4}>
      <Table>
        <Thead>
          <Tr
            fontFamily="Inter"
            fontSize="12px"
            fontWeight={600}
            color="#84919A"
          >
            <Th>
              <Checkbox
                isChecked={allSelected}
                onChange={toggleSelectAll}
                rounded="10px"
              />
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Amount
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Transaction ID
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Transaction Type
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Date
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Time
            </Th>
            <Th
              fontFamily="Inter"
              fontSize="12px"
              fontWeight={600}
              color="#84919A"
            >
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody
          sx={{
            border: "1px solid #EDEDF2",
            boxShadow: "sm",
            p: 6,
            rounded: "10px",
          }}
        >
          {paginatedData.map((item, idx) => (
            <Tr key={idx}>
              <Td>
                <Checkbox
                  isChecked={item?.id ? selectedRows.includes(item.id) : false}
                  onChange={() => item?.id && toggleRowSelection(item.id)}
                />
              </Td>
              <Td>₦{item?.amount.toLocaleString()}</Td>
              <Td>{item?.transaction_id}</Td>
              <Td>{item?.transaction_type}</Td>
              <Td>{formatDate(item?.date ? item?.date : "")}</Td>
              <Td>{item?.time}</Td>
              <Td>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="106px"
                  px={3}
                  py={1}
                  rounded="full"
                  borderWidth="1px"
                  fontSize="xs"
                  color={item?.status === "processed" ? "#5DC090" : "#F14156"}
                  bg={item?.status === "processed" ? "#EFFDED" : "#FEECEE"}
                  borderColor={
                    item?.status === "processed" ? "#5DC090" : "#F14156"
                  }
                  textTransform="capitalize"
                >
                  <Box w={2} h={2} rounded="full" bg="currentColor" mr={2} />
                  {item?.status}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex w='full' justify="space-between" mt={4}>
        <Text>{`Showing ${currentPage * itemsPerPage} of ${
          formattedData?.length
        } results`}</Text>
         <Pagination
          total={totalPages}
          onChange={setCurrentPage}
          dotsIcon={HiMiniChevronDoubleRight}
          siblings={0}
          boundaries={1}
          classNames={{
            control:
              "border border-gray-300 rounded-md w-[32px] h-[32px] px-3 py-1 transition-all",
            dots: "border border-gray-300  rounded-md w-[32px] h-[32px] transition-all",
          }}
        /> 
      </Flex>
    </Box>
  );
};

export default DataTable;
