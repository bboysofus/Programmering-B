let clientSocket
let state = 'enterName'


function setup(){
    createCanvas(windowWidth, windowHeight)
    background('green')

    //Fetch serveren
    fetch('http://localhost:1806/ip')
        .then(res => res.json())
            .then(data => {
                select('#info').html(data.ip)
            })

    //io kommer fra socketIo biblioteket
    clientSocket = io.connect()
    clientSocket.on('newMessage', message => {
        let p = createElement('P', message)
        select('#chat').child(p)
    })        
    select('#nameButton').mousePressed(()=>{
        clientSocket.emit('newUser', select('#name').value())
        select('#nameBox').addClass('hide')
        select('#chatBox').removeClass('hide')
    })
    
}

function draw(){

}

function keyPressed(){
    if(key == 'Enter'){
        let message = select('#message').value()

        //Emit tager et "emne" og noget data
        clientSocket.emit('chat', message)
        select('#message').value('')
    }
}

function mousePressed(){

}