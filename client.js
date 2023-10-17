const net = require('net');
const readline = require("readline");

const port = 12348;
const host = '127.0.0.1';


let isConnecting = false;
let client;

function connect() {
    client = new net.Socket();

    if (!isConnecting) {

        isConnecting = true;

        client.on('data', function (data) {
            const message = data.toString().trim();

            if (message === "FLEET_MODE") {
                console.log("FLEET_MODE::Open barrier")
            }

            if (message === "BILL_PAID") {
                console.log("BILL_PAID::Now open barrier")
            }
        });

        client.on('close', function () {
            isConnecting = false;
            setTimeout(connect, 1000);
            console.log('Connection closed');
        });


        // client.on('error', function () {
        //     console.log('Connection closed. Reconnecting...', Date.now());
        //     isConnecting = false;
        //     setTimeout(connect, 1000);
        // });

        client.on('error', function (error) {
            console.error('Socket error:', error);
            isConnecting = false;
            setTimeout(connect, 1000);
        })


        client.connect({ port, host }, function (socket) {
            isConnecting = true;
            console.log('Client successfully connected.');
            askUser();
           // client.write("TRIGGER")
            console.log(socket)
        });

    }
}


connect()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUser() {
    rl.question('Press T to trigger \n', (answer) => {
        if (answer.toLowerCase() === "t") {
            client?.write("TRIGGER");
        }
        askUser();
    });
}

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error?.message);
});

