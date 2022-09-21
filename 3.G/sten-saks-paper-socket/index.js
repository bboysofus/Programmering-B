//opret app med express
const express = require('express')
const app = express()

const ip = require('ip')
console.log(ip.address())

//Definér en port server skal kører på
const port = 1806

app.use('/', express.static('public/'))

//Opret serveren, som bruger appen, der lytter på porten
const server = app.listen(port, ()=>{
    console.log('Server lytter på ' + port);
})

//Opret en socket til server
const io = require('socket.io')
const serverSocket = io(server)



let players = []
let waiters = []

let names = []

//Al snak med klient(erne) sker på 'cennction' med .on
serverSocket.on('connection', socket => {

    

    console.log('En spiller: ' + socket.id + ' prøver at komme ind');
    //Der kommer en ny klient
    if(players.length >= 2){
        socket.emit('join', false)
        waiters.push( { 'id': socket.id} )
        console.log('Der er ikke plads. Spilleren blev sendt til "Waiters"');
        console.log('Antal waiters: ' + waiters.length);
    }else{
        socket.emit('join', true)
        players.push( { 'id': socket.id } )
        console.log('Ny spiller er inde: ' + socket.id);
        console.log('Antal spillere inde: ' + players.length);
    }
    
    socket.on('disconnect', () => {
        players = players.filter(p=>p.id != socket.id)
        waiters = waiters.filter(p=>p.id != socket.id)
        names = names.filter(p=>p.name != names.name)

        console.log(players);
        console.log(names);
    })

    socket.on('ready', message => {
        names.push(message)


        console.log(players);
        console.log(names);
    })
})
