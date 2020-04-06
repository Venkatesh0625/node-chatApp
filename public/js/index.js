var socket = io();

socket.on('connect', function () {
    console.log('Connected');
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMsg', function (msg) {
    console.log('New Message',msg);
});

