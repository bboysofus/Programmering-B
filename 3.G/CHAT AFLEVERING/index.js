console.log('Node script now running')
let colors = ['red', 'green', 'blue', 'purple']
//hent biblioteket ip
const ip = require('ip')
console.log(ip.address())
//Hent biblioteket socket.io for at lave en websocket
const socketLib = require('socket.io')

//hent biblioteket express og gem objektet i en konstant
const express = require('express')
//initaliser app objektet
const app = express()
//json array til brugerinfo
let users = []

let messageHistory = []
//definer en port
const port = 1806
//start en webserver på port 666
const server = app.listen(port, ()=>{
    console.log('Server lytter på port: ' + port)
})
// opret en server websocket
const serverSocket = socketLib(server)
app.use('/', express.static('public'))

//opret et endpoint som returnerer serverens ip
app.get('/ip', (req, res)=>{
    res.json(
        {
            'ip' : ip.address(),
            'port' : port
        }
    )
})

serverSocket.sockets.on('connection', socket => {
    console.log('new socket connection established')
    
    
    serverSocket.sockets.emit('msgHist', messageHistory)

    //socket.on er en eventlistener på nye beskeder fra klienter
    socket.on('newUser', user =>{
        users[socket.id] = ({'name':user.name, 'color':user.color})
        console.log(users)
    })

    socket.on('chat', message => {
        //når serveren modtager beskeder send den dem rundt til alle. (rundt til alle sockets)
        //users.push({'message':message})
        console.log(message)
        console.log(users)

        let newMessage = {}
        newMessage.message = message
        newMessage.name = users[socket.id].name
        newMessage.color = users[socket.id].color
        serverSocket.sockets.emit('newMessage', newMessage)

        let NewMsgForHist = {}
        NewMsgForHist.message = message
        NewMsgForHist.name = users[socket.id].name
        NewMsgForHist.color = users[socket.id].color
        messageHistory.push(NewMsgForHist)
    })
    
})