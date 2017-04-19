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

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Ma position</a>'); // target blanck => new tab

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});

// acknowledgement callback from server
// socket.emit('createMessage', {
//   from: 'Alex',
//   text: 'HI'
// }, function (data) {
//   console.log('Got it', data);
// });
