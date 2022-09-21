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
    select('#nameButton').mousePressed(() =>{
        select('#name').addClass('hide')
        select('#lobby').addClass('show')
    })
}

function draw(){}