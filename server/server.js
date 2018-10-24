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

  socket.on('disconnect', () => {
  	console.log('User is disconnected');
  });	
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);	
});



