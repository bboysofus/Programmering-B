let clientSocket

function setup(){
    noCanvas()

    //Connect til serveren
    clientSocket = io.connect()

    //Få besked om du er med, eller om der er optaget.
    clientSocket.on('join', ok => {
        if(ok){
            select('#name').addClass('show')
        }else{
            select('#reject').addClass('show')
        }
    })

    clientSocket.on('play', console.log('Spillet starter'))

    const test = ()=>{
        select('#lobby').addClass('hide')
        select('#play').addClass('show')
    }
    
    select('#nameButton').mousePressed(() =>{
        let message = {'name': select('#nameInput').value()}
        if(message != ''){
            clientSocket.emit('ready', message)
            select('#nameInput').value('')
            select('#name').addClass('hide')
            select('#lobby').addClass('show')
        }else{
            alert('Skriv et navn i tekstfeltet!')
        }
    })
}

function keyPressed(){
    if(key == 'Enter'){
        let message = {'name': select('#nameInput').value()}
        if(message != ''){
            clientSocket.emit('ready', message)
            select('#nameInput').value('')
            select('#name').addClass('hide')
            select('#lobby').addClass('show')
        }else{
            alert('Skriv et navn i tekstfeltet!')
        }
    }
}

function draw(){}