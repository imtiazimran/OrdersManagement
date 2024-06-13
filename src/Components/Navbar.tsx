import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box
      as="nav"
      bg={bg}
      color={color}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="sticky"
      w="100%"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        <Box>
          <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold" mr={4}>
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/sale-orders"
            fontSize="lg"
            fontWeight="bold"
            mr={4}
          >
            Sale Orders
          </Link>
        </Box>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
