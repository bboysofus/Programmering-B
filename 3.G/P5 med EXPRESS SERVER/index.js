console.log("HEJSA")

let colors = ['red', 'green', 'blue', 'purple']

//Hent biblioteket ip
const ip = require('ip')

console.log(ip.address())

//Hent biblioteket socket.io for at lave websocket
const socketLib = require('socket.io')

//Vælg en port
const port = 1806

//Opret en variabel, som holder express biblioteket
const express = require('express')

//Lav appen
const app = express()

//Json arry til brugere
let users = []

//Start serveren med app og lyt på din port
const server = app.listen(port, ()=>{
    console.log('Serveren kører på port: ' + port)
})

//Opret en serverSocket
const serverSocket = socketLib(server)

//Send public/ til client
app.use('/', express.static('public/'))

//Når vi får besøg på serveren
app.get('/ip', (req, res) => {
    res.json(
        {
            'ip': ip.address(),
            'port': port
        }
    )
})

serverSocket.sockets.on('connection', socket => {
    console.log('New socket connection established')

    //socket.on er en eventlistener på nye beskeder fra clienter
    socket.on('chat', message => {
        console.log(message)
        serverSocket.sockets.emit('newMessage', message)
    })
    socket.on('newUser', user =>{
        users.push({'name': user, 'id': socket.id})
        console.log(users)
    })
})