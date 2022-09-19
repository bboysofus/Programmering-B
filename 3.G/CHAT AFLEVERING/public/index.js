let clientSocket
let state = 'enterName'
let msgp
let namep
let msgHolder
let userInfo

function setup(){
    
    fetch('http://localhost:1806/ip')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            select('#info').html(data.ip)
        })

        clientSocket = io.connect()
        clientSocket.on('userInfo', users => {
            console.log(users)
            console.log(users[1])
            
            userInfo = users

        })

        clientSocket.on('msgHist', msgHist => {
            console.log(msgHist)

            msgHist.map(( message =>{
                console.log(message)
                console.log(message)
                //console.log(userInfo)
                msgHolder = createElement('div')
                msgHolder.addClass('msgHolder')
                namep = createElement('p', message.name)
                namep.addClass('namep')
                msgp = createElement('p', message.message)
                msgp.addClass('msgp')
                msgp.style('background-color', message.color)
        
                select('#chat').child(msgHolder)
                msgHolder.child(namep)
                msgHolder.child(msgp)
                select('#chat').elt.scrollTop = select('#chat').elt.scrollHeight
            }))


        })

        //io kommer fra socket.io biblioteket som vi linker til i html filen
        clientSocket.on('newMessage', message => {
            console.log(message)
            //console.log(userInfo)
            msgHolder = createElement('div')
            msgHolder.addClass('msgHolder')
            namep = createElement('p', message.name)
            namep.addClass('namep')
            msgp = createElement('p', message.message)
            msgp.addClass('msgp')
            msgp.style('background-color', message.color)

            select('#chat').child(msgHolder)
            msgHolder.child(namep)
            msgHolder.child(msgp)
            select('#chat').elt.scrollTop = select('#chat').elt.scrollHeight
        })

        select('#nameButton').mousePressed(()=>{
            console.log('new user - send to server')

            clientSocket.emit('newUser', {'name': select('#name').value(), 'color': select('#colors').value()})

            console.log('newUser', {'name': select('#name').value(), 'color': select('#colors').value()})
            select('#nameBox').addClass('hide')
            select('#chatBox').removeClass('hide')
        })
        
}

function draw(){
    
}

function keyPressed(){
    
    if(key == 'Enter'){
        let message = select('#message').value()
        if(message!=''){
            //emit tager et emne og noet data
            clientSocket.emit('chat', message)
            select('#message').value('')
        }
    }
}

function mousePressed(){

}