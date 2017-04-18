//console.log(__dirname + '/../public');
// path module cross OS

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//static express middleware

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit('newEmail', {
  //   from: 'alex@pantah.fr',
  //   text: 'hey !!'
  // });

  socket.emit('newMessage', {
    from: 'Ralex',
    text: 'See you',
    createdAt: 13334
  });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('create message', message);
  });

  socket.on('disconnect', function(){
    console.log('user was disconnected')
  });
})

server.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});
