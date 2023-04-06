import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Input,
  Button,
  Flex,
  Box,
  Stack,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };
  //listen to receive message event on socket server, side effects
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <Flex>
      <Stack
        width="400px"
        mt="20"
        color="white"
        border="2px"
        borderColor="red.200"
        borderRadius="lg"
      >
        {/* chat Header */}
        <Box
          maxW="md"
          borderWidth="1px"
          overflow="hidden"
          alignItems="center"
          backgroundColor="red"
          padding="10px 20px"
        >
          <Text>Live Chat</Text>
        </Box>
        {/* Chat Body */}
        <Box width="100%" height="300px"></Box>
        {/* Chat Footer */}
        <Box display="flex">
          <Input
            width="80%"
            type="text"
            placeholder="Hey..."
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <Button
            width="20%"
            onClick={sendMessage}
            background="red.500"
            _hover={{
              background: "white",
              color: "red.500",
              border: "1px red solid",
            }}
          >
            <ArrowRightIcon />
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Chat;
