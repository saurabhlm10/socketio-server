const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        // methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Received message:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
