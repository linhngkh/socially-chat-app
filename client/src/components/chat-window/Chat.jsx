import React, { useEffect, useRef, useState } from "react";
import { Text, Flex, Box, Stack, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef();

  const sendMessage = async () => {
    // if current message is not empty, we set props:
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
      // socket send old and new message
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
      <Box border="1px red solid" height="450px" borderRadius="lg">
        <Stack width="400px" overflow="hidden">
          {/* chat Header */}
          <Header />
          {/* Chat Body */}
          <Box width="100%" height="300px">
            <Container ref={scrollRef} as="div">
              {messageList.map((messageContent) => {
                return (
                  <Container
                    key={messageContent.id}
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <Box
                      background="gray.100"
                      cursor="pointer"
                      marginTop="5px"
                      padding="10px"
                      display="flex"
                      borderRadius="20px"
                      maxWidth="300px"
                    >
                      <Text>{messageContent.message}</Text>
                    </Box>
                    <Flex sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      <Text mr={3}>{messageContent.author}</Text>
                      <Text>{messageContent.time}</Text>
                    </Flex>
                  </Container>
                );
              })}
            </Container>
          </Box>
        </Stack>
        {/* Chat Footer */}
        <Footer
          sendMessage={sendMessage}
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
        />
      </Box>
    </Flex>
  );
};

export default Chat;
