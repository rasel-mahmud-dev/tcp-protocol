const net = require('net');

const express = require("express")
const readline = require("readline");
const app = express()

const port = 12348;
const host = '127.0.0.1';

const client = new net.Socket();

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

client.on('error', function () {
    console.log('error');
});

client.connect({port, host}, function (socket) {
    console.log('Client successfully connected.');
});


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
            client.write("Trigger");
        }
        askUser();
    });
}

askUser();



// app.listen(1300, ()=>{
//     console.log("http server is running on port 1200")
// })