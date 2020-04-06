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

    socket.emit('newMsg', {
        from:'John',
        text:'See you then',
        createdAt: 123123
    });

    socket.on('createMsg', (newMsg) => {
        console.log('Create Message',newMsg);
    });

    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});
server.listen(port, () => {
    console.log(`App is up on port ${port}`);
}); 