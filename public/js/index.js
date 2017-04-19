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
  var formattedTime = moment(message.createdAt).format('HH:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  //console.log('newMessage', message);
  //    var formattedTime = moment(message.createdAt).format('HH:mm');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} (${formattedTime}) : ${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('HH:mm');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">Ma position</a>'); // target blanck => new tab
  //
  // li.text(`${message.from} ()${formattedTime}) : `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    // clear the value
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Cherche position');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Partager position');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Partager position');
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
