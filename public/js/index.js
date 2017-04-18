var socket = io();

socket.on('connect', function(){ // safari support, arrow ES6 function not supported yet
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'kristofer@lflfl',
  //   text: 'hej nusmefisk'
  // });

  // socket.emit('createMessage', {
  //   from: 'Alex',
  //   text: 'yup thats work for me'
  // })

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMessage', function (message){
  console.log('newMessage', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

// acknowledgement callback from server
// socket.emit('createMessage', {
//   from: 'Alex',
//   text: 'HI'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
