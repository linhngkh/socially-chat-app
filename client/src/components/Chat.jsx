import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Button,
  Flex,
  Box,
  Stack,
  Container,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Flex>
      <Stack
        width="400px"
        border="2px"
        borderColor="red.200"
        borderRadius="lg"
        overflow="hidden"
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
          <Text color="white">Live Chat</Text>
        </Box>
        {/* Chat Body */}
        <Box width="100%" height="300px" borderBottom="1px red solid">
          {messageList.map((messageContent) => {
            return (
              <Container
                key={messageContent.id}
                id={username === messageContent.author ? "You" : "other"}
              >
                <Box>
                  <Text>{messageContent.message}</Text>
                </Box>
                <Box>
                  <Text>{messageContent.author}</Text>
                  <Text>{messageContent.time}</Text>
                </Box>
              </Container>
            );
          })}
        </Box>
        {/* Chat Footer */}
        <Box display="flex">
          <Input
            variant="unstyled"
            paddingLeft="5"
            width="80%"
            type="text"
            placeholder="Hey..."
            onChange={(e) => setCurrentMessage(e.target.value)}
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
      </Stack>
    </Flex>
  );
};

export default Chat;
