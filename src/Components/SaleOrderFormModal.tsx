/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useForm, Controller } from "react-hook-form";
import "../index.css";
import { useCreateOrder } from "../hooks/saleOrdersHooks";

type SaleOrderFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SaleOrderFormModal: React.FC<SaleOrderFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: mutation, isPending } = useCreateOrder();

  const items = [
    "Neptunium",
    "Plutonium",
    "Americium",
    "Curium",
    "Berkelium",
    "Californium",
    "Einsteinium",
    "Fermium",
    "Mendelevium",
    "Nobelium",
  ];

  const _options = items.map((label) => ({
    label,
    value: label.toLowerCase(),
  }));

  const onSubmit = (data: any) => {
    mutation(data);
    onClose();
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
              <Controller
                name="customer_id"
                control={control}
                defaultValue=""
                rules={{ required: "Customer ID is required" }}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl
              className="chakra-multiselect bg-transparent"
              mt={4}
              isInvalid={!!errors.items}
            >
              <FormLabel>Products</FormLabel>
              <Controller
                name="items"
                control={control}
                defaultValue={[]}
                rules={{ required: "At least one product is required" }}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    options={_options}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select products"
                    style={{ backgroundColor: "white" }}
                  />
                )}
              />
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.invoice_no}>
              <FormLabel>Invoice Number</FormLabel>
              <Controller
                name="invoice_no"
                control={control}
                defaultValue=""
                rules={{ required: "Invoice Number is required" }}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                defaultValue=""
                rules={{ required: "Invoice Date is required" }}
                render={({ field }) => <Input type="date" {...field} />}
              />
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.paid}>
              <FormLabel>Paid</FormLabel>
              <Controller
                name="paid"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} />}
              />
            </FormControl>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isPending}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderFormModal;
