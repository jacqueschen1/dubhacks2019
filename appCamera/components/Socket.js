import socketIO from 'socket.io-client';
import { Audio } from 'expo-av';

const socket = socketIO('http://10.19.51.52:8080/client', {
    transports: ['websocket'],
    jsonp: false
});
socket.connect();
socket.on('display', function(audiotext) {
    playSound(audiotext);
});

async function playSound(audiotext) {
    const soundObject = new Audio.Sound();
    console.log(audiotext);
    console.log(audiotext[0]);
    try {
        // React doesn't like dynamically made paths
        switch(audiotext[0]) {
            case 'wr':
                await soundObject.loadAsync(require('../assets/wr.mp3'));
                await soundObject.playAsync();
                break;
            case 'wl':
                await soundObject.loadAsync(require('../assets/wl.mp3'));
                await soundObject.playAsync();
                break;
            case 'wa':
                await soundObject.loadAsync(require('../assets/wa.mp3'));
                await soundObject.playAsync();
                break;
            case 'ea':
                console.log('eaaaaa')
                await soundObject.loadAsync(require('../assets/ea.mp3'));
                await soundObject.playAsync();
                break;
            case 'er':
                await soundObject.loadAsync(require('../assets/er.mp3'));
                await soundObject.playAsync();
                break;
            case 'el':
                await soundObject.loadAsync(require('../assets/el.mp3'));
                await soundObject.playAsync();
                break;
            default:
                //await soundObject.loadAsync(require('../assets/nf.mp3'));
                break;
        }
    } catch (error) {
        console.log(error);
    }
}

function subscribeToSocket(cb) {
    socket.on('this', message => cb(null, "connected"));
    console.log("connection established.");
}

function sendImage(input) {
    socket.emit('new-image', {img: input}, callback());
}

function callback(){
    console.log("sent");
}
  
export { subscribeToSocket, sendImage };