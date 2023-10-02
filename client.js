const net = require('net');

const express = require("express")
const app = express()

const port = 8080;
const host = '127.0.0.1';

const client = new net.Socket();



client.on('data', function(data) {
    console.log('Received from server:', data.toString());

    // Send a response back to the server
    client.write('Response from client', 'utf-8');
});

client.on('close', function() {
    console.log('Connection closed');
});


app.get("/send-message", (req, res)=>{
    res.send("message has been send.")
    client.write("Message from client", "utf-8");
})


app.listen(1200, ()=>{
    client.connect({ port, host }, function() {
        console.log('Client successfully connected.');
    });
    console.log("http server is running on port 1000")
})