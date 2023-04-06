import React from "react";
import { Box, Text } from "@chakra-ui/react";
const Header = () => {
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      overflow="hidden"
      alignItems="center"
      backgroundColor="red"
      padding="10px 20px"
    >
      <Text color="white" fontWeight="bold">Live Chat</Text>
    </Box>
  );
};

export default Header;
