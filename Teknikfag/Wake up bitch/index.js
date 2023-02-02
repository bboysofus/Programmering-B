let client
let currentPage

function setup(){
    noCanvas()
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', (response)=>{
        info.html('<b>Connected to nextblablabla.dk</b>')

        client.subscribe('programmering')

        client.on('message', (topic, message) => {
            console.log('<b>Modtog besked:</b> ' + message + ' <b>på emnet:</b> ' + topic)

        })
    })
}

slap = () => {
    client.publish('dinfar', 'pik')
}

stop = () => {
    client.publish('dinmor', 'fisse')
}

function draw(){
}