import redis from 'redis';
import http from 'http';
import socketio from 'socket.io';

const PORT = 8080;
const REDIS_IP = '175.0.0.3';

const server = http.createServer();
const io = socketio(server);

const client = redis.createClient({
    host: REDIS_IP
});

client.on("error", (err) => {
    console.log("Redis error: " + err);
});

server.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})