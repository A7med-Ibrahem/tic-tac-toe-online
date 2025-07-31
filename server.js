const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // ملفات اللعبة

io.on("connection", (socket) => {
  console.log("لاعب دخل:", socket.id);

  socket.on("play", (data) => {
    socket.broadcast.emit("play", data);
  });

  socket.on("restart", () => {
    socket.broadcast.emit("restart");
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

