//console.log(__dirname + '/../public');
// path module cross OS

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//static express middleware

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit from admin text welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // })

  socket.on('createMessage', (message) => {
    console.log('create message', message);
    // send a message to every connections
    io.emit('newMessage', generateMessage(message.from, message.text));

    // broadcasting to other users..
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', function(){
    console.log('user was disconnected')
  });
})

server.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});
