let activeDiv = document.getElementById("active");
let bussingList = document.getElementById("Bussing_List");

let socket = io();

const busAvailable = (index) => {
    socket.emit('bus_signal', index);
}

// Event handler for 'connect'
socket.on('connect', function() {
    console.log('Connected to server!');
});

document.getElementById('test').addEventListener('click', () => {
    socket.emit('start_signal');
});

document.getElementById('stop').addEventListener('click', () => {
    socket.emit('stop_signal');
});

document.getElementById("1").addEventListener('click', () => busAvailable(1));
document.getElementById("2").addEventListener('click', () => busAvailable(2));
document.getElementById("3").addEventListener('click', () => busAvailable(3));
document.getElementById("4").addEventListener('click', () => busAvailable(4));

socket.on('start', () => {
    activeDiv.innerHTML = 'Active';
})

socket.on('stop', () => {
    activeDiv.innerHTML = "Not Active";
})

socket.on('bus_available', (index) => {
    switch (index) {
        case 1:
            document.getElementById(1).style.color = "yellow";
            break;
        case 2:
            document.getElementById(2).style.color = "yellow";
            break;
        case 3:
            document.getElementById(3).style.color = "yellow";
            break;
        case 4:
            document.getElementById(4).style.color = "yellow";
            break;
        default:
            console.log("Bus not listed");
            break;
    }
})

socket.on('CResponse', function(data){
    console.log(data)
});

// Event handler for 'disconnect'
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});
