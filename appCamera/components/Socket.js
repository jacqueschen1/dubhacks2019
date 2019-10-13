import socketIO from 'socket.io-client';

const socket = socketIO('http://10.19.146.32:8080/', {
    transports: ['websocket'],
    jsonp: false
});
socket.connect(); 

function subscribeToSocket(cb) {
    socket.on('this', message => cb(null, "connected"));
    console.log("connection established");
}

function sendImage() {
    socket.emit('new-image', {img: "legereadasdasd"});
}
  
export { subscribeToSocket, sendImage };