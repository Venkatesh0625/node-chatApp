const path = require('path');
// alligator.io
//laeeto
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { 
    console.log('New user connected');

    socket.on('createMsg', (message) => {
        console.log('Create Message',message); 
        io.emit('newMsg', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});
server.listen(port, () => {
    console.log(`App is up on port ${port}`);
}); 