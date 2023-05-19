const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors')
const { Server } = require("socket.io");
const SocketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

app.use(cors())

SocketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`)
  socket.on('disconnection', () => {
    console.log('A user disconnected')
  })
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message)
  })
})

app.get('/test', (req, res) => {
  res.json({
    message: "hello world"
  })
})

http.listen(4000, () => {
  console.log('listening on *:4000');
});
