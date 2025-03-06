"use client";
import { useState } from "react";
import {
  Box,
  Center,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import { formatDate } from "@/utils/formatDate";
import Loader from "./Loader";

// Ensure API response is properly typed
const DataTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {


  // Ensure type safety with optional chaining
  const formattedData =
    transactions?.map((item) => ({
      id: typeof item?.id === "string" ? item?.id : item?.id?.$oid || "",
      amount: item?.amount || 0,
      transaction_id: `TR_${
        item?.transaction_id?.$oid || item?.transaction_id || ""
      }`,
      transaction_type: item?.transaction_type || "",
      date: item?.date || "",
      time: item?.time || "",
      status: item?.status || "",
    })) || [];

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const pageSize = 7;
  const totalPages = Math.ceil(formattedData.length / pageSize);
  const paginatedData = formattedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Select All / Individual Selection
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allSelected =
    selectedRows.length === paginatedData.length && paginatedData.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((item) => item?.id));
    }
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Box w="full" h="full" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={allSelected}
                onChange={toggleSelectAll}
              />
            </Th>
            <Th>Amount</Th>
            <Th>Transaction ID</Th>
            <Th>Transaction Type</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item) => (
            <Tr key={item?.id}>
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
                  color={
                    item?.status === "processed" ? "#5DC090" : "#F14156"
                  }
                  bg={
                    item?.status === "processed" ? "#EFFDED" : "#FEECEE"
                  }
                  borderColor={
                    item?.status === "processed" ? "#5DC090" : "#F14156"
                  }
                >
                  <Box
                    w={2}
                    h={2}
                    rounded="full"
                    bg="currentColor"
                    mr={2}
                  />
                  {item?.status}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Text>{`Showing ${page * pageSize} of ${formattedData?.length} results`}</Text>
        {/* <Pagination
          total={totalPages}
          onChange={setPage}
          dotsIcon={HiMiniChevronDoubleRight}
          siblings={0}
          boundaries={1}
        /> */}
      </Box>
    </Box>
  );
};

export default DataTable;

