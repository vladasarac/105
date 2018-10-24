const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');//ovo je samo da i napravili cistiju i kracu putanju do public foldera(glupost)
// console.log(publicPath);
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);//pravimo http server i kao argument dajemo app tj express server
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  //emitujemo klijentu newMessage kad se konektuje, generateMessage() je funkcija iz /utils/message.js koja pravi message koji emitujemo
  socket.emit('newMessage', generateMessage('Admir', 'Welcome to chat App'));

  //ovo se emituje svim klijentima osim onom koji se upravo konektovao, generateMessage() je funkcija iz /utils/message.js koja pravi message koji emitujemo
  socket.broadcast.emit('newMessage', generateMessage('Admir', 'New User Joined'));

  //listener za event createMessage koji emituje klijent tj /public/js/index.js fajl, argument callback je funkcija definisana pri emitovanju eventa
  socket.on('createMessage', function(message, callback){
    console.log('createMessage', message);
    //emitujemo newMessage svim klijentima okacenim na server, generateMessage() je funkcija iz /utils/message.js koja pravi message koji emitujemo
  	io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  //event za disconnect event, kad se klijent otkaci
  socket.on('disconnect', () => {
  	console.log('User is disconnected');
  });	
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);	
});



