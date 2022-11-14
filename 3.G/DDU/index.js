let currentPage = '#pass'

//Initialisér variabler
let passInput, passButton, lysInput, lysButton, musInput, musButton

//Opret client, som skal connecte til mqtt
let client

//Variabel til at tjekke, hvor langt i spillet vi er
let counter = 0

function setup(){
    //Vi fjerner p5 canvas, da det ikke skal bruges
    noCanvas()
 
    //Vi kører funktionen initVars() fra, som henter alle id'er fra html
    initVars()

    //Vi sætter den viste side, når man kommer ind
    shiftPage('#pass')

    //Connect client til mqtt server
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    //Når vi connecter
    client.on('connect', (response)=>{
        console.log('<b>Connected to mqtt.nextservices.dk</b>')

        //Vi subscriber og lytter på emnet 'xmasEscape'
        client.subscribe('xmasEscape')

        //Når vi får beskeder udefra på et emne
        client.on('message', (topic, message) => {
            console.log('<b>Modtog besked:</b> ' + message + ' <b>på emnet:</b> ' + topic)
        })
    })

    passButton.mousePressed(()=>{
        if(passInput.value().toLowerCase() == 'nisse' && currentPage == '#pass' && counter == 0){
            setTimeout(()=>{shiftPage('#codes')}, 2000) 
            counter++
        }else{
            //Lav animation på .passInput her
            alert('Forkert kode!!')
        }
    })

    lysButton.mousePressed(()=>{
        if(lysInput.value().toLowerCase() == 'julemand' && currentPage == '#codes' && counter == 1){
            client.publish('xmasEscape', 'lys indtastet')
            musInput.removeAttribute('disabled')
            counter++
        }else{
            alert('Forkert kodeeeee!')
        }
    })

    musButton.mousePressed(()=>{
        if(musInput.value().toLowerCase() == '12' && currentPage == '#codes' && counter == 2){
            client.publish('xmasEscape', 'mus indtastet')
        }else{
            alert('Forkert kodeeeeeeeeeee!!!!!!!!!')
        }
    })
}

function keyPressed(){
    console.log(key, lysInput.value())
    if(lysInput.value().toLowerCase() + 'd' == 'julemand' && currentPage == '#codes' && counter == 1){
        client.publish('xmasEscape', 'lys indtastet')
        musInput.removeAttribute('disabled')
        counter++
    }
    if(key == 'Enter' && currentPage == '#pass' && counter == 0){
        if(passInput.value().toLowerCase() == 'nisse'){
            counter++
            setTimeout(()=>{shiftPage('#codes')}, 2000)
        }else{
            alert('Forkert kode!!')
        }
    }else if(key == 'Enter' && currentPage == '#codes' && counter == 1){
        if(lysInput.value().toLowerCase() == 'julemand'){
            counter++
            client.publish('xmasEscape', 'lys indtastet')
        }else{
            alert('Forkert kodeeeee!')
        }
    }else if(key == 'Enter' && currentPage == '#codes' && counter == 2){
        if(musInput.value().toLowerCase() == '12'){
            client.publish('xmasEscape', 'mus indtastet')
        }else{
            alert('Forkert kodeeeeeeeeeee!!!!!!!!!')
        }
    }
}

//Funktion der nemt kan skifte siden fra html
function shiftPage(pageId){
    select(currentPage).removeClass('show')
    select(pageId).addClass('show')
    currentPage = pageId
}

//Funktion der henter alle id'er fra html, så de nemt kan bruges
function initVars(){
    passInput = select('#passInput')
    passButton = select('#passButton')
    lysInput = select('#lysInput')
    lysButton = select('#lysButton')
    musInput = select('#musInput')
    musButton = select('#musButton')
}