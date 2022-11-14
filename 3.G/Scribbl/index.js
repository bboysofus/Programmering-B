//opret server med express
const express = require('express')
//Tilføj IP-adresse
const ip = require('ip')
console.log(ip.address())
//Opret variabel app, som indeholder serverbiblioteket
const app = express()
//Vælg en port, server skal køre på
const port = 4444
//Sig at appen skal serve mappen 'public'
app.use('/', express.static('public'))
//Sæt appen til at lytte på porten
const server = app.listen(port, ()=>{
    console.log('server lytter på adressen: http://localhost:' + port)
})

//opret en socket - hent et socketbibliotek ind i variablen IO
const io = require('socket.io')
//Serverens hoved walkie talkie, som tusinder af klienter kan snakke igennem
const serverSocket = io(server)
//Serveren kan holder styr på, hvor langt i spillet vi er, med denne viabel
let gotName = 0
//Players arrayet er serverens sted til at holde styr på de to spillere
let players = []
//vi laver et array med tegninger
let drawings = ['kartoffel', 'fisk', 'nisse']

//al snak med klienterne sker på connection
serverSocket.on('connection', socket => {
    //tjek om der er plads til flere spillere 
    //hvis ikke, send join, false
    if(players.length >= 2){
        console.log('der var ikke plads til: ' + socket.id)
        socket.emit('join', false)
        //Luk spilleres socket
        socket.disconnect()
    }else{
        //ellers tilføj spillere til players array
        players.push({ 'id':socket.id})
        //og send join, true
        socket.emit('join', true)        
        console.log('ny spiller: ' + socket.id)
        console.log('Der er nu ' + players.length + ' spillere')
        console.log('Hvoraf ' + players.filter(p=>p.name).length + ' har indtastet deres navn')    
    }
    
    //modtag spillernavne
    socket.on('name', name => {
        //Find() returnerer DET FØRSTE element, som lever op til en betingelse
        let thisPlayer = players.find( p => p.id == socket.id )
        //indsæt navnet i objektet i players array 
        thisPlayer.name = name
        //Hvad hvis der er to med det samme navn?
        let otherPlayer = players.find( p => p.id != socket.id)
        if(otherPlayer && (otherPlayer.name == thisPlayer.name)){
            thisPlayer.name = 'Kartoffel-' + thisPlayer.name
        }
        //registrer at vi har modtaget et navn til - læg 1 til navnetæller
        gotName ++
        console.log('Fik navn: ' + name, ' Vi har nu ' + gotName + ' navn(e)')        
        //hvis vi har modtaget BEGGE navne
        if(gotName == 2){
            console.log('got both names, ready to play')
        //vi uddeler et random ord fra "drawings" arrayet til tegneren
        let whatWord = Math.round(Math.random(drawings.length -1 ))
        let word = drawings[whatWord]
        console.log('har valgt ordet: ' + word)
        //lav en random variabel
        let r = Math.random(1)
        //vi skal uddele og sende rollerne tegner og gætter og starter spillet
        //vi sender et random ord fra drawings arrayet
        if(r >= .5){
            serverSocket.to(thisPlayer.id).emit('play',{'role':'guess', 'word':word})
            serverSocket.to(otherPlayer.id).emit('play',{'role':'draw', 'word':word})
        }else{
            //omvendt
            serverSocket.to(thisPlayer.id).emit('play',{'role':'draw', 'word':word})
            serverSocket.to(otherPlayer.id).emit('play',{'role':'guess', 'word':word})
        }

        }
    })

    //Når vi modtager koordinater fra klientes mus
    socket.on('coords', obj => {
        //Sender vi dem tilbage til klienterne igen
        serverSocket.emit('draw', obj)
    })


    //håndter disconnect - hvis en spiller lukker sin side
    socket.on('disconnect', ()=>{
        console.log('Player disconnected opdaterer array ')
        //fjern spilleren fra players array
        players = players.filter( p => p.id != socket.id)
        //find ud af om der er flere spillere tilbage, og sæt navnetælleren
        gotName = players.filter(p => p.name).length 
        //set valgtælleren til nul
        gotChoice = 0
        //send eventuel spiller tilbage til start 
        serverSocket.emit('join', true)
        console.log('Har fjernet spiller', players, 'Der er ' + gotName + ' spillere tilbage, som har indtastet navn')
    })

    //håndter 'nyt spil' knap
    socket.on('restart', ()=>{
        console.log('Restarting game, same players ')
        //Vi skal sætte timeren forfra
        //start spil
        serverSocket.emit('play', true)
    })
})

let time = 10

setInterval(()=>{
    serverSocket.emit('timer', time)
    time--
    if(time == 0){
        //Stop spillet
        serverSocket.emit('result', players)
    }
}, 1000)