const net = require('net');

const port = 8080;
const host = '127.0.0.1';

const server = net.createServer();

const clients = [];
let clientIdCounter = 0


server.on('connection', (socket) => {
    console.log('Client connected');
    clientIdCounter++;
    socket.id = clientIdCounter
    clients.push(socket);

    socket.on('data', (data) => {
        console.log('Received from client:', data.toString());
        socket.write("Message from client " + Date.now().toString(), "utf-8");
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clients.splice(clients.indexOf(socket), 1);
    });
});

server.listen(port, host, () => {
    console.log('TCP server is running on port ' + port);
});
