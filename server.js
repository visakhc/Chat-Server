const express = require('express'); //requires express module

const socket = require('socket.io'); //requires socket.io module

const fs = require('fs');
const {getUserCount, addUser} = require("./users");

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT); //tells to host server on localhost:3000

app.use(express.static('public')); //show static files in 'public' directory

console.log('Server is running');

const io = socket(server);


io.on('connection', (socket) => {

    console.log("New user connection: " + socket.id)
    const {error, user} = addUser({id: socket.id, user_id: "s"});


    socket.on('sendMessage', (id, message, timeStamp) => {
         io.emit('receivedMessage', {status: true, data: { id: id, message: message, timeStamp: timeStamp}});
    })

    io.emit('userCount', {status: true, data: getUserCount()});

})