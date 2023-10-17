const net = require('net');

const express = require("express")
const readline = require("readline");
const app = express()

const port = 8080;
const host = '127.0.0.1';

const client = new net.Socket();
client.setMaxListeners(2)

let connectedClients = [];

client.on('data', function (data) {
    const message = data.toString().trim();
    console.log(message)

    if (message === "FLEET_MODE") {
        console.log("FLEET_MODE::Open barrier")
    }

    if (message === "BILL_PAID") {
        console.log("BILL_PAID::Now open barrier")
    }

});

client.on('close', function () {
    console.log('Connection closed');
});

let intervalId;
client.on('error', function () {
    console.log('error');
    intervalId = setInterval(()=>{
        connect()
    }, 1000)
});


function connect(){
    if (!client.connected) {
        client.connect({port, host}, function (socket) {
            console.log('Client successfully connected.');
        });
    } else {
        clearInterval(intervalId)
        console.log("client already connected")
    }
}

connect()

// app.get("/", (req, res) => {
//     res.send("Trigger has been send.")
//     client.write("Trigger");
// })


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUser() {
    rl.question('Press T to trigger \n', (answer) => {
        if (answer.toLowerCase() === "t") {
            client.write("TRIGGER");
        }
        if (answer.toLowerCase() === "f") {
            client.write("FLEET");

        }
            askUser();
    });
}

askUser();



// app.listen(1300, ()=>{
//     console.log("http server is running on port 1200")
// })