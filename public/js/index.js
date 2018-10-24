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
});

