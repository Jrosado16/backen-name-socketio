const express = require('express');
const path = require('path')
const app = express();
require('dotenv').config();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./socketIO/socket.io')

const pathName = path.resolve(__dirname, 'public')
app.use(express.static(pathName))
server.listen(process.env.PORT, () => {
    console.log('server on port:',process.env.PORT)
})