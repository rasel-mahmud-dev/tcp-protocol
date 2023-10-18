const net = require('net');
const readline = require("readline");

const port = 60036;
const host = '192.168.152.203';


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

        client.on('error', function () {
            console.error('Socket error:');
            isConnecting = false;
            setTimeout(connect, 1000);
        })

        client.on('connect', function (error) {
           console.log("client has been connected.")
            isConnecting = true;
        })

        client.connect({ port, host });

    }
}

connect()