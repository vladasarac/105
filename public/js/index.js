var socket = io();

//kad se klijent okaci na server tj na event connect
socket.on('connect', function(){
  console.log('Connected to server');
});	

//kad se klijent otkaci od servera
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

//listener za event newMessage koji se emituje iz server.js 
socket.on('newMessage', function(message){
  console.log('NewMessage', message);	
  //ubacujemo prisitgli message u <ol id="messages">
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

//emitjemo createMessage event i saljemo callback koji se poziva u listeneru
// socket.emit('createMessage', {
//   from: 'Pera',
//   text: 'Jedenje govana'
// }, function(data){
//   console.log(data);
// });

//kad se sabmituje forma u index.html
$('#message-form').on('submit', function(e){
  e.preventDefault();
  //emitujemo createMessage event i kao text saljemo userov unos u formu iz index.html 
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data){
    console.log(data);
  });
});
