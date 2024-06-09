import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateSKU } from "../hooks/saleOrdersHooks";

type SaleOrderFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Item = {
  sku_id: number;
  price: number;
  quantity: number;
};

type SaleOrderFormData = {
  customer_id: number;
  items: Item[];
  paid: boolean;
  invoice_no: string;
  invoice_date: Date;
};

const SaleOrderFormModal: React.FC<SaleOrderFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SaleOrderFormData>({
    defaultValues: {
      customer_id: 0,
      items: [{ sku_id: 0, price: 0, quantity: 0 }],
      paid: false,
      invoice_no: "",
      invoice_date: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const createSKU = useCreateSKU();

  const onSubmit = async (data: SaleOrderFormData) => {
    const res = await createSKU.mutate(data);
    console.log(res, data);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.customer_id}>
              <FormLabel>Customer ID</FormLabel>
              <Input
                type="number"
                {...register("customer_id", {
                  required: "Customer ID is required",
                })}
                placeholder="Enter Customer ID"
              />
              {errors.customer_id && (
                <Box color="red.500">{errors.customer_id.message}</Box>
              )}
            </FormControl>

            {fields.map((item, index) => (
              <Box key={item.id} mt="4">
                <FormControl isInvalid={!!errors.items?.[index]?.sku_id}>
                  <FormLabel>SKU ID</FormLabel>
                  <Input
                    type="number"
                    {...register(`items.${index}.sku_id` as const, {
                      required: "SKU ID is required",
                    })}
                    placeholder="Enter SKU ID"
                  />
                  {errors.items?.[index]?.sku_id && (
                    <Box color="red.500">
                      {errors.items?.[index]?.sku_id?.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.items?.[index]?.price} mt="2">
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    {...register(`items.${index}.price` as const, {
                      required: "Price is required",
                    })}
                    placeholder="Enter Price"
                  />
                  {errors.items?.[index]?.price && (
                    <Box color="red.500">
                      {errors.items?.[index]?.price?.message}
                    </Box>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={!!errors.items?.[index]?.quantity}
                  mt="2"
                >
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    {...register(`items.${index}.quantity` as const, {
                      required: "Quantity is required",
                    })}
                    placeholder="Enter Quantity"
                  />
                  {errors.items?.[index]?.quantity && (
                    <Box color="red.500">
                      {errors.items?.[index]?.quantity?.message}
                    </Box>
                  )}
                </FormControl>
                <Button mt="2" colorScheme="red" onClick={() => remove(index)}>
                  Remove Item
                </Button>
              </Box>
            ))}
            <Button
              mt="4"
              onClick={() => append({ sku_id: 0, price: 0, quantity: 0 })}
            >
              Add Item
            </Button>

            <FormControl mt="4">
              <FormLabel>Paid</FormLabel>
              <Checkbox {...register("paid")}>Paid</Checkbox>
            </FormControl>

            <FormControl isInvalid={!!errors.invoice_no} mt="4">
              <FormLabel>Invoice Number</FormLabel>
              <Input
                type="text"
                {...register("invoice_no", {
                  required: "Invoice number is required",
                })}
                placeholder="Enter Invoice Number"
              />
              {errors.invoice_no && (
                <Box color="red.500">{errors.invoice_no.message}</Box>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.invoice_date} mt="4">
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                control={control}
                name="invoice_date"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="MM/dd/yyyy"
                  />
                )}
              />
              {errors.invoice_date && (
                <Box color="red.500">{errors.invoice_date.message}</Box>
              )}
            </FormControl>

            <Button type="submit" colorScheme="blue" mt="4">
              Create
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderFormModal;
