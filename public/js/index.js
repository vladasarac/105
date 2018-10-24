var socket = io();

//kad se klijent okaci na server tj na event connect
socket.on('connect', function(){
  console.log('Connected to server');
  //emitovanje eventa createEmail koji ima listener u server.js
  // socket.emit('createEmail', {
  // 	to: 'sima@yahoo.com',
  // 	text: 'BLA BLA BLA BLA'
  // });
  //mitovanje eventa createMessage koji ima listener u server.js
  // socket.emit('createMessage', {
  // 	from: 'Vlada',
  // 	text: 'bla bla ovo je message...'
  // });
});	

//kad se klijent otkaci od servera
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

// //listener za event newEmail koji se emituje iz server.js 
// socket.on('newEmail', function(email){
//   console.log('New Email', email);	
// });
//listener za event newMessage koji se emituje iz server.js 
socket.on('newMessage', function(message){
  console.log('NewMessage', message);	
});

