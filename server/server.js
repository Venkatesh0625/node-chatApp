const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMsg } = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {  
    console.log('New user connected');
    
    socket.emit('newMsg', generateMsg('Admin','Welcome to chat app'));

    socket.broadcast.emit('newMsg', generateMsg('Admin','New User joined'));

    socket.on('createMsg', (message) => {
        console.log('Create Message',message); 


        
        io.emit('newMsg', generateMsg(message.from, message.text));

        // socket.broadcast.emit('newMsg', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});
server.listen(port, () => {
    console.log(`App is up on port ${port}`);
}); 