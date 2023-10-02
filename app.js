const net = require("net")
const express = require("express")

const app =  express()

const server = net.createServer({
    keepAlive: true
})

server.listen(8080, ()=>{
    console.log("tcp server is running on port 8080")
})
