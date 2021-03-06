var socket = io();

//funkcija koja proverava na kom delu ekrana je user i ako je pri dnu a stigne nova poruka scroluje se na dno ekrana da bi bila vidljiva
function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); 
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log('Should scroll');
    messages.scrollTop(scrollHeight);
  }
}

//kad se klijent okaci na server tj na event connect
socket.on('connect', function(){
  console.log('Connected to server');
});	

//kad se klijent otkaci od servera
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

//--------------------------------------------------------------------------------------------------------------------------------------------------

//listener za event newMessage koji se emituje iz server.js 
socket.on('newMessage', function(message){
  // console.log('NewMessage', message);	
  //koristimo moment library da bi formatirali vreme tj createdAt property message objekta
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // //ubacujemo prisitgli message u <ol id="messages">
  // var li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // $('#messages').append(li);
  //ovde koristimo mustache template engin tj saljemo index.html-u sta da prikaze u <script id="message-template">
  var template = $('#message-template').html();
  var html = Mustache.render(template, {text: message.text, from: message.from, createdAt: formattedTime});
  $('#messages').append(html);
  scrollToBottom();//pozivamo funkciju za crolovanje ekrana da bi nova poruka bila vidljiva
});

//--------------------------------------------------------------------------------------------------------------------------------------------------

//listener za event newLocationMessage koji emituje server.js i salje adresu za google maps, to se desava kad user klikne btn SendLocation
socket.on('newLocationMessage', function(message){
  //koristimo moment library da bi formatirali vreme tj createdAt property message objekta
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');
  // li.text(`${message.from}  ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
  //ovde koristimo mustache template engin tj saljemo index.html-u sta da prikaze u <script id="location-message-template">
  var  template = $('#location-message-template').html();
  var html = Mustache.render(template, {url: message.url, from: message.from, createdAt: formattedTime});
  $('#messages').append(html);
  scrollToBottom();//pozivamo funkciju za crolovanje ekrana da bi nova poruka bila vidljiva
});

//--------------------------------------------------------------------------------------------------------------------------------------------------

//emitjemo createMessage event i saljemo callback koji se poziva u listeneru
// socket.emit('createMessage', {
//   from: 'Pera',
//   text: 'Jedenje govana'
// }, function(data){
//   console.log(data);
// });

//--------------------------------------------------------------------------------------------------------------------------------------------------

//kad se sabmituje forma u index.html
$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  //emitujemo createMessage event i kao text saljemo userov unos u formu iz index.html 
  socket.emit('createMessage', {
    from: 'User',
    text: $(messageTextbox).val()
  }, function(data){
    // console.log(data);
    $(messageTextbox).val('');
  });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------

//klik na Send Location button
var locationButton = $('#send-location');
locationButton.on('click', function(e){
  //ako j stari browser pa nema geolociranje
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  //ako u browseru radi geolocation
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    // console.log(position);
    //emitujemo event createLocationMessage, koji salje koordinate usera
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){//ako user neda dozvolu browseru da deli njegovu poziciju
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------

