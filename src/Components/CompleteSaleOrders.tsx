/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  List,
  Spinner,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
} from "@chakra-ui/react";
import { useFetchOrders } from "../hooks/saleOrdersHooks";
import { useFetchCustomers } from "../hooks/useCustomerHooks";
import { TCustomer } from "../api/customerApi";

const CompletedSaleOrders: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useFetchOrders();
  const { data } = useFetchCustomers();

  const customerMap = data?.reduce((acc: any, customer: TCustomer) => {
    acc[customer.id] = customer.name;
    return acc;
  }, {});

  const saleOrdersWithCustomerNames = orders?.map((order) => ({
    ...order,
    customerName: order.customer_id ? customerMap[order.customer_id] : null,
    price: order.items.reduce((total, item) => total + item.price, 0),
  }));

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt="20" color="red.500">
        Error: {(error as Error).message}
      </Box>
    );
  }

  return (
    <Box p="4">
      <List spacing="3">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>SKU List</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Customer Name</Th>
                <Th>Price</Th>
                <Th>Last Modify</Th>
                {/* <Th>Edit/View</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {saleOrdersWithCustomerNames?.map((order: any) => (
                <Tr key={order?.customer_id}>
                  <Td>{order?.customer_id}</Td>
                  <Td>{order?.customerName}</Td>
                  <Td>{order?.price}</Td>
                  <Td>{order?.invoice_date}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot />
          </Table>
        </TableContainer>
      </List>
    </Box>
  );
};

export default CompletedSaleOrders;
