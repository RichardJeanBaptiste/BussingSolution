let activeDiv = document.getElementById("active");
console.log("Connected to html Pages")

let socket = io();


// Event handler for 'connect'
socket.on('connect', function() {
    console.log('Connected to server!');
});

document.getElementById('test').addEventListener('click', () => {
    socket.emit('start_signal');
});

document.getElementById('stop').addEventListener('click', () => {
    socket.emit('stop_signal');
})

socket.on('start', () => {
    activeDiv.innerHTML = 'Active';
})

socket.on('stop', () => {
    activeDiv.innerHTML = "Not Active";
})

socket.on('CResponse', function(data){
    console.log(data)
});

// Event handler for 'disconnect'
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});
