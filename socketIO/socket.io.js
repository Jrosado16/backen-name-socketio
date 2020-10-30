const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon Jovi'));

io.on('connection', client => {
    console.log('client is connect')

    client.emit('active-bands', bands.getBands())

    client.on('disconnect', () => {
        console.log('client is disconnect')
    })

    client.on('mensaje', payload => {
        console.log('Mensaje: ', payload)

        io.emit('mensaje',{admin: 'Nuevo mensaje'})
    })

    client.on('emitir-mensaje', payload => {
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);
    })

    client.on('vote-band', payload => {
        console.log(payload);
        bands.votesBand(payload.id);
        io.emit('active-bands', bands.getBands())
    })

    client.on('add-band', payload => {
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands())
    })

    client.on('delete-band', payload => {
        console.log(payload);
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands())
    })
})