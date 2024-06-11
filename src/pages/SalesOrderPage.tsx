import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ActiveSaleOrders from "../Components/ActiveSaleOders";
import CompletedSaleOrders from "../Components/CompleteSaleOrders";
import SaleOrderFormModal from "../Components/SaleOrderFormModal";

const SaleOrdersPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p="4">
      <Tabs variant="enclosed">
        <Flex justify="space-between" align="center" mb="4">
          <TabList>
            <Tab>Active Sale Orders</Tab>
            <Tab>Completed Sale Orders</Tab>
          </TabList>
          <Button onClick={onOpen} colorScheme="blue">
            + Sale Order
          </Button>
        </Flex>
        <TabPanels>
          <TabPanel>
            <ActiveSaleOrders />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderFormModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SaleOrdersPage;
