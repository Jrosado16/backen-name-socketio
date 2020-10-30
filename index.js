const express = require('express');
const path = require('path')
const app = express();
require('dotenv').config();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('client is connect')

    client.on('disconnect', () => {
        console.log('client is disconnect')
    })

    client.on('mensaje', payload => {
        console.log('Mensaje: ', payload)

        io.emit('mensaje',{admin: 'Nuevo mensaje'})
    })
})

const pathName = path.resolve(__dirname, 'public')

app.use(express.static(pathName))


server.listen(process.env.PORT, () => {
    console.log('server on port: ', process.env.PORT)
})