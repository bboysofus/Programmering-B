let client
let currentPage

function setup(){
    currentPage = '#frontpage'

    //Menu handling
    select("#frontpage-icon").mousePressed( () => shiftPage('#frontpage'))
    select("#about-icon").mousePressed( () => shiftPage('#about'))
    select("#profile-icon").mousePressed( () => shiftPage('#profile'))

    
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', (response)=>{
        info.html('<b>Connected to nextblablabla.dk</b>')

        client.subscribe('programmering')

        client.on('message', (topic, message) => {
            console.log('<b>Modtog besked:</b> ' + message + ' <b>på emnet:</b> ' + topic)
        })
    })
}

function shiftPage( newPage ){
    if(newPage != currentPage){
        select( newPage ).addClass('show')

        setTimeout( () => {
            select( currentPage ).removeClass('show')
            currentPage = newPage
        }, 500)
    }
}

function draw(){
}