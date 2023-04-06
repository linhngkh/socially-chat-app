import React, { useEffect, useRef, useState } from "react";
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
import ScrollToBottom from "react-scroll-to-bottom";

const ChatBody = {
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  borderBottom: "1px red solid",
};

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef();

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
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  //listen to receive message event on socket server, side effects
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  //use scrollIntoView method when a new message comes up
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessage]);

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
        <Box width="100%" height="300px">
          <div ref={scrollRef}>
            {messageList.map((messageContent) => {
              return (
                <Container
                  key={messageContent.id}
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <Box>
                    <Text>{messageContent.message}</Text>
                  </Box>
                  <Flex>
                    <Text mr={3} fontWeight="bold">
                      {messageContent.author}
                    </Text>
                    <Text>{messageContent.time}</Text>
                  </Flex>
                </Container>
              );
            })}
          </div>
        </Box>
      </Stack>
      {/* Chat Footer */}
      <Box display="flex">
        <Input
          variant="unstyled"
          paddingLeft="5"
          width="80%"
          type="text"
          value={currentMessage}
          placeholder="Hey..."
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
    </Flex>
  );
};

export default Chat;
