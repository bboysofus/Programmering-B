//Vi laver en variabel "clientSocket"
let clientSocket

// Vi bruger p5.JS's funktion "setup()", som bliver kørt igang, når serveren starter
function setup(){
    //Vi sætter vores variabel til at connecte til io websocket med funktionen "connect()"
    clientSocket = io.connect()
    //Nå vi besøger serveren, får vi en besked på emnet "everybody", som bliver sendt til alle klienter på serveren
    clientSocket.on('everybody', message => {
        console.log('Got message from server to all clients: ' + message)
    })
    //Når vi besøger serveren, får vi en privatbesked på emnet "private", som kun vi får på serveren
    clientSocket.on('private', message => {
        console.log('Got private message from server: ', message)
    })
    //Vi får en besked på emnet "fromServer". Der bliver taget fat i diven "#answer" med funktionen "select()" og sætter indholdet til beskeden. Dette sker når clienten trykker på "test socket"-knappen. 
    clientSocket.on('fromServer', message => {
        console.log('Got reply from server: ', message)
        select('#answer').html(message)
    })
    //Når vi trykker på knappen med id "#someButton", sender vi en besked til serveren på emnet "fromClient"
    select('#someButton').mousePressed(()=>{
        clientSocket.emit('fromClient', 'Hej med dig server')
    })
}