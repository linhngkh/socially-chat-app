import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/chat-window/Chat";
import {
  Text,
  Container,
  Stack,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

// client side connect to server port 3001
const socket = io.connect("http://localhost:3001");

const boxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Container sx={boxStyles}>
      {!showChat ? (
        <VStack>
          <Text fontSize="5xl" color="red">
            Join A Chat{" "}
          </Text>
          <Stack spacing={3}>
            {" "}
            <Input
              variant="outline"
              type="text"
              placeholder="Join..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              variant="outline"
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button colorScheme="red" onClick={joinRoom}>
              Join A Room
            </Button>
          </Stack>
        </VStack>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Container>
  );
}

export default App;
