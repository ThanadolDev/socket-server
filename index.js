const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cookieParser = require("cookie-parser");
app.use(cookieParser("yourSecretGoesHere"));
app.get("/", (req, res) => {
  res.sendFile('index.html', { root: '.' })
  date = Date.now().toString();
  res.cookie("ChatId", date);
  console.log(req.cookies);
});

io.on("connection", (socket) => {
  console.log("a user connected: ");
  socket.broadcast.emit("hi");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message",  msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
