//console.log(__dirname + '/../public');
// path module cross OS

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//static express middleware

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit from admin text welcome to the chat app
  //socket.emit('newMessage', generateMessage('Admin', 'Bienvenue sur pantah chat'));
  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });

  // socket.broadcast.emit from Admin text New user joined
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'Nouvel utilisateur connecté'));
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // })

  // listener for joining a room
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Nom et salle discussion doivent être spécifiés'); // return pour sortir de la fonction si données invalides
    }

    // join a room
    socket.join(params.room);

    users.removeUser(socket.id); // prevent les users de se connecter a plusieur room

    // update user list
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // io.emit -> io.to(params.room).emit
    // socket.broadcast.emit -> socket.boradcast to(params.room).emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Bienvenue sur pantah chat'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} a rejoint la salle`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    // to send username info
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) { // && prevent empty message
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    console.log('create message', message);
    // send a message to every connections
    //io.emit('newMessage', generateMessage(message.from, message.text));

    // acknowledgement callback send to the client
    callback();

    // broadcasting to other users..
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // listener for createLocationMessage
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} a quitté la salle`));
    }
    console.log('user was disconnected')
  });
});

server.listen(port, () => {
  console.log(`Server is up on port : ${port}`);
});
