import socketio from 'socket.io';
import { getAudio } from '../../../appCamera/components/TextSpeech';
const ss = require('socket.io-stream');
const rp = require('request-promise');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
// Requires xmlbuilder to build the SSML body
const xmlbuilder = require('xmlbuilder');


// Gets an access token.
function getAccessToken() {
    let options = {
        method: 'POST',
        uri: 'https://eastus2.api.cognitive.microsoft.com/sts/v1.0/issuetoken',
        headers: {
            'Ocp-Apim-Subscription-Key': "bb5093744e4645629f929064fdc225c9"
        }
    }
    return rp(options);
}

function textToSpeech(accessToken, text, socket) {
    // Create the SSML request.
    let xml_body = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', 'en-us')
        .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        .txt(text)
        .end();
    // Convert the XML into a string to send in the TTS request.
    let body = xml_body.toString();
    
    let options = {
        method: 'POST',
        baseUrl: 'https://eastus2.tts.speech.microsoft.com/',
        url: 'cognitiveservices/v1',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'User-Agent': 'jacquesDub2019',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml'
        },
        body: body
    }

    let request = rp(options)
        // .on('response', (response) => {
        //     if (response.statusCode === 200) {
        //         console.log("API Call success");
        //         let stream = ss.createStream();
        //         ss(socket).emit('display', stream);
        //         request.pipe(stream);
        //         console.log("audio stream complete");
        //     }
        // });
    return request;
}

async function sendAudio(text, socket) {
    socket.emit('display', text);
    // API Call not used due to time constraint, but it works!
    try {
        //const accessToken = await getAccessToken();
        //console.log(accessToken);
        //await textToSpeech(accessToken, text, socket);
        return;
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}