import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import { Text, Container, Stack, Input, Button } from "@chakra-ui/react";

const socket = io.connect("http://localhost:3001");

const boxStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <Container sx={boxStyles}>
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

      <Chat socket={socket} username={username} room={room} />
    </Container>
  );
}

export default App;
