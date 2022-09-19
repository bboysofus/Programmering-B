//Vi laver en konstant og henter biblioteket "express".
const express = require('express')
//Vi laver en konstant app til klienten og sætter den lig med express
const app = express()
//Vi laver en port på 4000
const port = 4000
//Når klienten bruger app, skal de modtage mappen "public". Vi bruger expressfunktionen 'static'
app.use('/', express.static('public'))
//Vi sætter vores server op som en konstant, som bruger app til at lytte på porten. Når serveren kører, console.log'er vi localhost-adressen + porten
const server = app.listen(port, () => {
  console.log('App listening on http://localhost:' + port)
})
//Vi opsætter ny varibel som henter "socket.io" biblioteket
const io = require("socket.io")
//Vi laver en konstant, som kører vores server som en socket med funktionen io()
const serverSocket = io(server)

//Når vi får besøg på vores socketServer
serverSocket.on('connection', socket => {
  //Vi console.log'er clientens socket-id
  console.log('a user connected ' + socket.id)
  //Vi sender en privatbeked på emnet "private" med clientens id til den enkelte client der besøger serveren
  socket.emit('private', 'Her er en privat besked med dit id ' + socket.id)
  //Vi sender en offentlig besked på emnet "everybody" til alle clienter på serveren med den nybesøgende clients id
  serverSocket.emit('everybody', 'Vi fik en ny klient med id ' + socket.id)
  //Vi sender besked på emnet "everybody else" til alle andre end den nybesøgende client
  socket.broadcast.emit('everybody else', 'Besked fra den nye socket id ' + socket.id)
  //Når vi får besked fra en client på emnet "fromClient", console.log'er vi beskeden og sender en besked tilbage til den individuelle client på samme emne
  socket.on('fromClient', message => {
    console.log('Modtog besked: ' + message + ' på emnet fromClient')
    socket.emit('fromServer', 'Besked modtaget, tak for det.')
  })
})