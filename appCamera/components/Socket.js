import socketIO from 'socket.io-client';

const socket = socketIO('http://10.19.51.52:8080/client', {
    transports: ['websocket'],
    jsonp: false
});
socket.connect();
socket.on('display', function(audiotext) {
    console.log(audiotext);
});

function subscribeToSocket(cb) {
    socket.on('this', message => cb(null, "connected"));
    console.log("connection established");
}

function sendImage(input) {
    socket.emit('new-image', {img: input}, callback());
}

function callback(){
    console.log("sent");
}
  
export { subscribeToSocket, sendImage };