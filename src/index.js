const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// Database Connection
mongoose.connect('mongodb://localhost/javascript-chat')
    .then(db => console.log('>>> db is connected'))
    .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

// Sending static files
 app.use(express.static(path.join(__dirname, 'public')));

// Start Server
server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
