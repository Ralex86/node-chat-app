var socket = io();

socket.on('connect', function(){ // safari support, arrow ES6 function not supported yet
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'kristofer@lflfl',
  //   text: 'hej nusmefisk'
  // });

  socket.emit('createMessage', {
    from: 'Alex',
    text: 'yup thats work for me'
  })

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//
//   console.log('New email', email);
// })

socket.on('newMessage', function (message){
  console.log('newMessage', message);
});
