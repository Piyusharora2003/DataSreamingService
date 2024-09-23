const io = require("socket.io-client");
const socket = io('http://localhost:' + process.env.ServerPort);

socket.on('initialData', (data) => {
  console.log('Initial data:', data);
});

socket.on('newData', (data) => {
    
    if (typeof data !== 'object') {
        console.log('No more data to receive');
        socket.disconnect();
        process.exit(0);
    }
    else {
        console.log('New data:', data);
    }
});

setTimeout(() => {
  socket.disconnect();
}, 215000); // running the socket for some random time 
