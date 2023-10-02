const net = require('net');

const port = 8080;
const host = '127.0.0.1';

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log('Received from client:', data.toString());

        // Respond to the client
        // socket.write('Response from server', 'utf-8');
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, host, () => {
    console.log('TCP server is running on port ' + port);
});
