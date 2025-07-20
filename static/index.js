console.log("Connected to html Pages")

let socket = io();

// Event handler for 'connect'
socket.on('connect', function() {
    console.log('Connected to server!');
});

socket.on('CResponse', function(data){
    console.log(data)
})

// Event handler for 'disconnect'
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});
