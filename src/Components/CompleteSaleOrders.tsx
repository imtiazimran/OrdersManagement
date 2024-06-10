/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDeleteSKU, useFetchSKUs } from "../hooks/saleOrdersHooks";
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

const CompletedSaleOrders: React.FC = () => {
  const { data: skus, isLoading, isError, error } = useFetchSKUs();
  const deleteSKU = useDeleteSKU();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSKU, setSelectedSKU] = useState<any>(null);

  console.log(skus);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<SKUFormData>();

  const handleViewSKU = (sku: any) => {
    setSelectedSKU(sku);
    reset(sku);
    onOpen();
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
                onClick={() => handleViewSKU(sku)}
                colorScheme="yellow"
              >
                View
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
          <ModalHeader>View SKU</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>SKU Name</FormLabel>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Enter SKU name"
                  isReadOnly
                />
                {errors.name && (
                  <Box color="red.500">{errors.name.message}</Box>
                )}
              </FormControl>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CompletedSaleOrders;
