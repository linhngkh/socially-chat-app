import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Footer = ({ sendMessage, currentMessage, setCurrentMessage }) => {
  return (
    <Box width="100%">
      <Input
        size="md"
        paddingLeft="5"
        width="80%"
        type="text"
        value={currentMessage}
        placeholder="Write something..."
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button
        onClick={sendMessage}
        background="red.500"
        color="white"
        width="20%"
        _hover={{
          background: "white",
          color: "red.500",
          border: "1px red solid",
        }}
      >
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};

export default Footer;
