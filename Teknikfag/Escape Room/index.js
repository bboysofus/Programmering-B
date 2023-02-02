//Vi laver en variabel 'currentPage' og sætter den til startsiden
let currentPage = '#pass'

//Initialisér variabler
let passImage, passInput, passInputBox, passButton, lysImage, lysInput, lysInputBox, lysButton, musImage, musInput, musInputBox, musButton, morseButton, grayBackground, morseHelp, videoButton, video

//Opret client, som skal connecte til mqtt
let client

//Variabel til at tjekke, hvor langt i spillet vi er
let counter = 0

let upper = 0

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

    //Når man klikker på knappen til at se morsekodealfabet
    morseButton.mouseClicked(()=>{
        counter++
        grayBackground.style('visibility', 'visible')
        grayBackground.style('opacity', '100%')
        morseHelp.style('visibility', 'visible')
        setTimeout(()=>{morseHelp.style('opacity', '100%')}, 500)
    })

    //Når man klikker på morsekodealfabetet for at lukke det igen
    morseHelp.mouseClicked(()=>{
        counter--
        morseHelp.style('opacity', '0%')
        setTimeout(()=>{morseHelp.style('visibility', 'hidden')}, 500)
        grayBackground.style('opacity', '0%')
        setTimeout(()=>{grayBackground.style('visibility', 'hidden')}, 500)
    })

    videoButton.mouseClicked(()=>{
        if(counter==0){
            video.style('top', '15vh')
            console.log('Visible');
            counter++
        }
        
        else if(video.style('top', '15vh')){
            video.style('top', '-100vh')
            console.log('Hidden');
            counter--
        }
    })
}

//Funktion der lytter på tast fra tastatur
function keyPressed(){
    //Når første kode er skrevet rigtigt ind
    if(passInput.value().toLowerCase() + '2' == '241222' && currentPage == '#pass' && counter == 0){
        setTimeout(()=>{passInput.value('')}, 100)
        setTimeout(()=>{passInput.attribute('disabled', 1)}, 100)
        passInputBox.style('background-color', 'green')
        passImage.style('background-image', 'url("./assets/lock-open.png")')
        counter++
        client.publish('xmasEscape', 'lysBegin')
        setTimeout(()=>{shiftPage('#codes')}, 1000)
    }

    //Når anden kode er skrevet rigtigt ind
    if(lysInput.value().toLowerCase() + 'd' == 'julemand' && currentPage == '#codes' && counter == 1){
        setTimeout(()=>{lysInput.attribute('disabled', 1)}, 100)
        lysInputBox.style('background-color', 'green')
        lysImage.style('background-image', 'url("./assets/lock-open.png")')
        setTimeout(()=>{musInput.style('background-image', 'url("assets/træmmer-off.png")')}, 500)
        setTimeout(()=>{musInput.removeAttribute('disabled')}, 500)
        client.publish('xmasEscape', 'lysDone')
        counter++
    }

    //Når tredje kode er skrevet rigtigt ind
    if(musInput.value().toLowerCase() + 's' == 'mus' && currentPage == '#codes' && counter == 2){
        setTimeout(()=>{musInput.attribute('disabled', 1)}, 100)
        musInputBox.style('background-color', 'green')
        musImage.style('background-image', 'url("./assets/lock-open.png")')
        morseButton.style('visibility', 'visible')
        morseButton.style('opacity', '100%')
        client.publish('xmasEscape', 'musDone')
    }

    //Hvis morsekodealfabet er synligt, kan man lukke igen med escape
    if(key == 'Escape' && counter == 3){
        counter--
        morseHelp.style('opacity', '0%')
        setTimeout(()=>{morseHelp.style('visibility', 'hidden')}, 500)
        grayBackground.style('opacity', '0%')
        setTimeout(()=>{grayBackground.style('visibility', 'hidden')}, 500)
    }

    if(key == 'Escape' && counter == 1){
        video.style('top', '-100vh')
        counter--
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
    passImage = select('#passImage')
    passInput = select('#passInput')
    passInputBox = select('#passInputBox')
    passButton = select('#passButton')
    lysImage = select('#lysImage')
    lysInput = select('#lysInput')
    lysInputBox = select('#lysInputBox')
    lysButton = select('#lysButton')
    musImage = select('#musImage')
    musInput = select('#musInput')
    musInputBox = select('#musInputBox')
    musButton = select('#musButton')
    morseButton = select('#morseButton')
    grayBackground = select('#grayBackground')
    morseHelp = select('#morseHelp')
    videoButton = select('#videoButton')
    video = select('#video')
}