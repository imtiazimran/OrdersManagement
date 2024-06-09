/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchSKUs,
  useCreateSKU,
  useUpdateSKU,
  useDeleteSKU,
} from "../hooks/saleOrdersHooks";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

type SKUFormData = {
  name: string;
  // Add other fields as needed
};

const ActiveSaleOrders: React.FC = () => {
  const { data: skus, isLoading, isError, error } = useFetchSKUs();
  const createSKU = useCreateSKU();
  const updateSKU = useUpdateSKU();
  const deleteSKU = useDeleteSKU();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSKU, setSelectedSKU] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SKUFormData>();

  const handleCreateSKU = (data: SKUFormData) => {
    createSKU.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleEditSKU = (sku: any) => {
    setSelectedSKU(sku);
    reset(sku);
    onOpen();
  };

  const handleUpdateSKU = (data: SKUFormData) => {
    updateSKU.mutate(
      { id: selectedSKU.id, updatedSKU: data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleDeleteSKU = (id: number) => {
    deleteSKU.mutate(id);
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
        <form onSubmit={handleSubmit(handleCreateSKU)}>
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
        {skus?.map((sku: any) => (
          <ListItem
            key={sku.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {sku.name}
            <Box>
              <Button
                size="sm"
                mr="2"
                onClick={() => handleEditSKU(sku)}
                colorScheme="yellow"
              >
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => handleDeleteSKU(sku.id)}
                colorScheme="red"
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit SKU</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleUpdateSKU)}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>SKU Name</FormLabel>
                <Input
                  type="text"
                  {...register("name", { required: "This field is required" })}
                  placeholder="Enter SKU name"
                />
                {errors.name && (
                  <Box color="red.500">{errors.name.message}</Box>
                )}
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr="3" type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActiveSaleOrders;
