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

  //emitovanje eventa newEmail(sa objektom u kom su podatci) koji ima listenera u /public/js/index.js fajlu 
  // socket.emit('newEmail', {
  // 	from: 'vladasarac@hotmail.com',
  // 	text: 'bla bla truc truc!',
  // 	createAt: 123
  // });

  //emitovanje eventa newMessage(sa objektom u kom su podatci) koji ima listenera u /public/js/index.js fajlu 
  socket.emit('newMessage', {
  	from: 'Sima',
  	text: 'bla bla truc truc novi message!',
  	createAt: 123
  });

  //listener za event createEmail koji emituje klijent tj /public/js/index.js fajl
  socket.on('createEmail', function(newEmail){
    console.log('createEmail', newEmail);
  });

  //listener za event createMessage koji emituje klijent tj /public/js/index.js fajl
  socket.on('createMessage', function(message){
    console.log('createMessage', message);
  });

  //event za disconnect event, kad se klijent otkaci
  socket.on('disconnect', () => {
  	console.log('User is disconnected');
  });	
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);	
});



