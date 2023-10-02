const net = require('net');

const port = 8080;
const host = '127.0.0.1';

const server = net.createServer();

const clients = [];


server.on('connection', (socket) => {
    console.log('Client connected');
    clients.push(socket);

    socket.on('data', (data) => {
        console.log('Received from client:', data.toString());

        // Broadcast the message to all clients
        clients.forEach((client) => {
            // if (client !== socket) {
                client.write(data);
            // }
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clients.splice(clients.indexOf(socket), 1);
    });
});

server.listen(port, host, () => {
    console.log('TCP server is running on port ' + port);
});
