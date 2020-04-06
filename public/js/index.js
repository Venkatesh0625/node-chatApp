var socket = io();

socket.on('connect', function () {
    console.log('Connected');

    socket.emit('createMsg', {
        from: 'Faker',
        text: 'Yup, that works for me.'
    });
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMsg', function (msg) {
    console.log('New Message',msg);
});

