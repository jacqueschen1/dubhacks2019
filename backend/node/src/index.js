import redis from 'redis';
import http from 'http';
import socketio from 'socket.io';

const PORT = 8080;
const REDIS_IP = '175.0.0.3';

const PROBABILITY_THREASHOLD = 0.5;

var sessions = {};

/**
 * Helper functions
 */
function hash(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


/**
 * REDIS
 **/
 const client = redis.createClient({
     host: REDIS_IP
 });
client.on("error", (err) => {
    console.log("Redis error: " + err);
});


/**
 * HTTP Server
 **/
const requestHandler = (request, response) => {
  console.log("New request: " + request.url)
  response.end('Hello World!');
}
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log("Socketio server listening on port " + PORT);
});


/**
 * SOCKET IO
 **/
const io = socketio(server);

/**
 * Top level socket communication code.
 */
io.on('connection', function (socket) {
  console.log("[SocketIO] New socket connection.");

});

/**
 * Navigation service communication code (Backend <--> Navigator Service)
 */
const imager_socket = io.of('/service_imager');
imager_socket.on('connection', function(socket){
  console.log('Imager service connected.');
});

/**
 * Navigation service communication code (Backend <--> Navigator Service)
 */
const navigator_socket = io.of('/service_navigator');
navigator_socket.on('connection', function(socket){
  console.log('Navigation service connected.');

  socket.on('return-navigator-details', function(data) {
    console.log('[Navigator '+data.session_id+'] session payload response:');
    console.log(JSON.stringify(data.payload, null, 2));
    let text = '';
    for (object in data.payload) {
      str.concat(text, object["text"]);
    }
    sendAudio(text, client_socket);
  });

});

/**
 * Recognition service communication code (Backend <--> Recognition Service)
 */
const recognition_socket = io.of('/service_recognition');
recognition_socket.on('connection', function(socket){
  console.log('Recognition service connected.');

  socket.on('return-process-image', function(data) {
    console.log('[Recognition '+data.session_id+'] session payload response:');
    console.log(JSON.stringify(data.payload, null, 2));
    console.log(data.payload.length);
    client_socket.to(data.session_id).emit('display', data.payload.length);

    let objects = data.payload;

    //Loop through results and filter by prob threashold.
    if (objects.length > 0) {
      objects = objects.filter(function(el) {
        return el["probability"] > PROBABILITY_THREASHOLD;//&& el['tagName'] != 'exit';
      });
      navigator_socket.emit('navigate', data.session_id, objects);
      imager_socket.emit('process-bounding-box', data.session_id, { 'img': sessions[data.session_id].img, 'payload': objects}); //Send to imager for debugging.
      console.log("hey"+sessions[data.session_id].connected_at);
    }

  });

});

/**
 * Client communication code (Backend <--> Recognition Service)
 */
const client_socket = io.of('/client');
client_socket.on('connection', function(socket){
  console.log('Client connected.');

  //Generate new session and session ID.
  var session_id = hash(6);
  sessions[session_id] = {
    session_id: session_id,
    connected_at: Math.floor(Date.now() / 1000),
  };
  console.log("[SocketIO] Assigned session ID: " + session_id);
  socket.join(session_id); //Join client to room of session id.

  console.log("[SocketIO] Active sessions:");
  console.log(JSON.stringify(sessions, null, 2));

  socket.emit('session_id', session_id); //Return session id back.

  io.emit('this', { will: 'be received by everyone'});

  /**
   * Receives a new image from device.
   * @param image_string {String}      Base64 of image file.
   */
  socket.on('new-image', function (image_string) {
    console.log("[SocketIO "+session_id+"] New image data!");

    //TODO do some basic image validation here.

    //Send to recognition service.

    if (image_string.img != null) {
      recognition_socket.emit('process-image', session_id, image_string.img);
      sessions[session_id].img = image_string.img;
    }
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
    delete sessions[session_id];
    console.log("[SocketIO] Client disconnected.");
    console.log("[SocketIO] Active sessions:");
    console.log(JSON.stringify(sessions, null, 2));
  });
});
