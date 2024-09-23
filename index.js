const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { demodata } = require('./demodata');

require("dotenv").config();

// create a new socket server
const io = new Server(server, {
  cors: {
    origin: process.env.ClientURL, 
    methods: ['GET', 'POST'],
  }
});

// The data to emit is taken from a stored file demodata.js
const data = demodata;

let connectedUsers = 0;
let programStartTime = Date.now();

io.on('connection', (socket) => {
    
    console.log('A user connected , total users: ', ++connectedUsers);

    let beginIndex = Math.floor((Date.now() - programStartTime) / process.env.EMIT_INTERVAL);

    io.emit( "newData" , beginIndex < data.length ? data[++beginIndex] : "Device disconnected" );
    
    let interval =  setInterval(() => {
        io.emit( "newData" , beginIndex < data.length ? data[++beginIndex] : "Device disconnected" );
    }, process.env.EMIT_INTERVAL); 

    socket.on('disconnect', () => {
        console.log('A user disconnected , total users: ', --connectedUsers);
        clearInterval(interval);
    });

});


server.listen(process.env.ServerPort , () => {
  console.log('Server listening on port ' + process.env.ServerPort );
});