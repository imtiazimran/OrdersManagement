/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchOrders,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
} from "../hooks/saleOrdersHooks";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
import { useFetchCustomers } from "../hooks/useCustomerHooks";
import { TCustomer } from "../api/customerApi";

type SKUFormData = {
  name: string;
  // Add other fields as needed
};

const ActiveSaleOrders: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useFetchOrders();
  const { data } = useFetchCustomers();

  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const customerMap = data?.reduce((acc: any, customer: TCustomer) => {
    acc[customer.id] = customer.name;
    return acc;
  }, {});

  const saleOrdersWithCustomerNames = orders?.map((order) => ({
    ...order,
    customerName: order.customer_id ? customerMap[order.customer_id] : null,
    price: order.items.reduce((total, item) => total + item.price, 0),
  }));

  console.log(saleOrdersWithCustomerNames);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isActionOpen,
    onOpen: onActionOpen,
    onClose: onActionClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteConfirmOpen,
    onOpen: onDeleteConfirmOpen,
    onClose: onDeleteConfirmClose,
  } = useDisclosure();
  const [selectedSKU, setSelectedSKU] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SKUFormData>();

  const handleCreateOrder = (data: SKUFormData) => {
    createOrder.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  // const handleEditSKU = (sku: any) => {
  //   setSelectedSKU(sku);
  //   reset(sku);
  //   onEditOpen();
  // };

  const handleUpdateOrder = (data: SKUFormData) => {
    updateOrder.mutate(
      { id: selectedSKU.id, updatedSKU: data },
      {
        onSuccess: () => {
          onEditClose();
        },
      }
    );
  };
  const handleDeleteSKU = (id: number) => {
    deleteOrder.mutate(id, {
      onSuccess: () => {
        onDeleteConfirmClose();
        onActionClose();
      },
    });
  };

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
      <Box mb="4">
        <form onSubmit={handleSubmit(handleCreateOrder)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>SKU Name</FormLabel>
            <Input
              type="text"
              {...register("name", { required: "This field is required" })}
              placeholder="Enter SKU name"
            />
            {errors.name && <Box color="red.500">{errors.name.message}</Box>}
          </FormControl>
          <Button mt="4" type="submit" colorScheme="teal">
            Create SKU
          </Button>
        </form>
      </Box>
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
                <Th>Edit/View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {saleOrdersWithCustomerNames?.map((order: any, i: number) => (
                <Tr key={i}>
                  <Td>{order?.customer_id}</Td>
                  <Td>{order?.customerName}</Td>
                  <Td>{order?.price}</Td>
                  <Td>12/10/2024</Td>
                  <Td
                    onClick={() => {
                      setSelectedSKU(order);
                      onActionOpen();
                    }}
                    style={{ cursor: "pointer", width: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot />
          </Table>
        </TableContainer>
      </List>

      {/* Action Modal */}
      <Modal isOpen={isActionOpen} onClose={onActionClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="blue"
              mr="3"
              onClick={() => {
                onActionClose();
                onEditOpen();
              }}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={onDeleteConfirmOpen}>
              Delete
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit SKU</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleUpdateOrder)}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>SKU Name</FormLabel>
                <Input
                  type="text"
                  defaultValue={selectedSKU?.name}
                  {...register("name", { required: "This field is required" })}
                  // placeholder={selectedSKU?.name}
                />
                {errors.name && (
                  <Box color="red.500">{errors.name.message}</Box>
                )}
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr="3" type="submit">
                  Save
                </Button>
                <Button onClick={onEditClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteConfirmOpen} onClose={onDeleteConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this SKU?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr="3"
              onClick={() => handleDeleteSKU(selectedSKU.id)}
            >
              Delete
            </Button>
            <Button onClick={onDeleteConfirmClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveSaleOrders;
