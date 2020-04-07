var socket = io();

socket.on('connect', function () {
    console.log('Connected');
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

socket.on('newMsg', function (message) {
    console.log('New Message',message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li)
});

socket.on('newLocationMsg', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var anchor_tag = jQuery('<a target="_blank">Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    anchor_tag.attr('href', message.url);
    li.append(anchor_tag);

    jQuery('#messages').append(li);
})

// socket.emit('createMsg', {
//     from: 'Frank',
//     text: 'Hi!'
// }, function (data) {
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMsg', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });

    jQuery('#message-form').each(function () {
        this.reset();
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported');
    }

    locationButton.attr('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch');
    })
});