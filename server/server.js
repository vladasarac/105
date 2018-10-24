const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');//ovo je samo da i napravili cistiju i kracu putanju do public foldera(glupost)
// console.log(publicPath);
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);//pravimo http server i kao argument dajemo app tj express server
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  //emitujemo klijentu newMessage kad se konektuje
  socket.emit('newMessage', {
    from: 'Admir',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime() 
  });

  //ovo se emituje svim klijentima osim onom koji se upravo konektovao
  socket.broadcast.emit('newMessage', {
    from: 'Admir',
    text: 'New user joined',
    createdAt: new Date().getTime() 
  });

  //listener za event createMessage koji emituje klijent tj /public/js/index.js fajl
  socket.on('createMessage', function(message){
    console.log('createMessage', message);
    //emitujemo newMessage svim klijentima okacenim na server
  	io.emit('newMessage', {
  	  from: message.from,
  	  text: message.text,
  	  createdAt: new Date().getTime()	
  	});
  });

  //event za disconnect event, kad se klijent otkaci
  socket.on('disconnect', () => {
  	console.log('User is disconnected');
  });	
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);	
});



