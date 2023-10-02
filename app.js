const net = require("net")
const express = require("express")

const app =  express()

const port = 8080;
const host = '127.0.0.1';

const server = net.createServer()

server.on("connection", ()=>{
    console.log("client connected, ")
})

server.on("close", ()=>{
    console.log("client connection dropped, ")
})

server.listen(port, host, ()=>{
    console.log("tcp server is running on port " + port)
})
