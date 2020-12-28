#!/usr/bin/env node

var watch = require('node-watch');
var fs = require("fs")
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = '/users/jasonaa/.clip/current'

app.use(express.static('public'))


 watch(path, { recursive: false }, function(evt, name) {
   console.log('%s changed.', name);
   const cont = fs.readFileSync(path).toString()
   console.log("Content:", cont)
   io.emit("data", cont)
 });


io.on('connection', (socket) => {
  console.log('A user connected!');
});

const port = process.env.PORT || 3000

http.listen(port, () => console.log(`Uniclip Dashboard listening on port ${port}! Head to http://localhost:${port} in a browser to see the dashboard in action.`))
