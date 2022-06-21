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

    io.emit('connected', socket.id);

    const {error, user} = addUser({id: socket.id, user_id: "s"});


    socket.on('sendMessage', (id, message, time, imageUrl, timeStamp, mime) => {
        // console.log("[SERVER]  message = " + message + ", mime = " + mime + ", image = " + imageUrl + ", time = " + time)
        io.emit('receivedMessage', {
            status: true,
            data: {id: id, message: message, time: time, imageUrl: imageUrl, timeStamp: timeStamp, mime: mime}
        });
    })

    io.emit('userCount', {status: true, data: getUserCount()});

    socket.on('userTyping', (id, status) => {
        console.log("[SERVER]  id " + id + "  typing = status: " + status)
        io.emit('typing', id, status);
    })
})