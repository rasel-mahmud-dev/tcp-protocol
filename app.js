const net = require('net');

const port = 8080;
const host = '127.0.0.1';

const server = net.createServer();

let clients = [];
let clientIdCounter = 0


server.on('connection', (socket) => {
    console.log('Client connected');
    clientIdCounter++;
    socket.id = clientIdCounter

    clients.push(socket);

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(message)

        if (message === "TRIGGER") {
            console.log("TRIGGER::Open barrier")
            console.log(clients.length)
        }

        if (message === "FLEET") {
            console.log("FLEET::Open barrier")
            console.log(clients.length)
        }

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
        clients = clients.filter(client => client !== socket);
    });

    socket.on('error', function (err) {
        console.log('Client error:');
        socket.destroy();
    });
});

server.listen(port, host, () => {
    console.log('TCP server is running on port ' + port);
    clients.forEach(client => {
        client.end();
    });

    // Clear the array of connected clients
    clients = [];
});

