const net = require('net');

const express = require("express")
const port = 60036;
const host = '0.0.0.0';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('Client connected asd d sdf');

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(message)
        getNumberConnected(server)

    }); 

    function getNumberConnected(server){
        server.getConnections((err, count) => {
            if (!err) {
                console.log(`Total connected clients: ${count}`);
            }
        });

    }

    socket.on('end', () => {
        console.log('Client disconnected');
        socket.end();
    });

    socket.on('error', function (err) {
        console.log('Client error:');
        socket.destroy();
    });
});

server.listen(port, host, () => {
    console.log('TCP server is running on port ' + port)
});


const app =  express() 

app.get("/", (req, res)=>{
    res.send("hio")
})

app.listen(3000, ()=>console.log("http server is running on port 300"))
