const net = require("net")

const port = 8080;
const host = '127.0.0.1';

const client = new net.Socket();

client.connect({port, host}, function (){
    console.log("client successfully connected.")
});

client.on('data', function(data) {
    console.log('Received data from server: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});