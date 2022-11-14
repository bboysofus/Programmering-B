let clientSocket
let currentPage = '#name'
let nameInput, nameButton, drawingWord, rejectButton, lobbyText, timer, winner, restartButton, guessButton, canvas, guessInput, chat, chatBox, go, thickness
let c

function setup(){
  frameRate(400)
  //laver et canvas til "tegning"
  c = createCanvas(200, 200)
  background('green')
  //log på serveren 
  clientSocket = io.connect()
  //Vi kalder funktionen initVars(), så vi kan bruge alle vores select's (længere nede i dokumentet) alle steder
  initVars()
  //Vi sætter vores canvas med variablen c ind vores canvas div
  canvas.child(c)
  //
  shiftPage('#name')

  //få besked om du er med eller om du må vente
  clientSocket.on('join', ok => {
    //Hvis ja
    if(ok){
      console.log('got ok to join, showing namepage')
      //Der skiftes til navnesiden
      shiftPage('#name')
      //Hvis ikke
    }else{
      //Der skiftes til rejectsiden
      shiftPage('#reject')
    }
  })

  //håndter rejectknappen
  rejectButton.mousePressed(()=>{
    //Reloader siden
    window.location.reload()
  })

  //håndter indtastet navn
  nameButton.mousePressed(()=>{
    //Hvis der er indtastet noget i inputfeltet
    if(nameInput.value() != ''){
      //Send på emnet 'name' til server
      clientSocket.emit('name', nameInput.value())
      lobbyText.html('Venter på spillere')
      //Skift til lobbysiden og vent på anden spiller
      shiftPage('#lobby')
    }else{
      confirm('indtast et navn')
    }

    //Når begge spillere har indtastet navn, skal spil starte. Server sender to roller til klienter, som klienterne modtager tilfældigt
    //Vi modtager et json objekt fra server med roller og tilfældigt tegne-ord
    clientSocket.on('play', obj =>{
      console.log('got play, starting game ' + obj.role)
      console.log('Got the word: ' + obj.word);
      //uddel rollerne guesser og drawer
      //Hvis man er drawer, skal guess-elementer fjernes
      if(obj.role=='draw'){
        drawingWord.html('Tegn: ' + obj.word)
        guessInput.hide()
        guessButton.hide()
      }else{
        drawingWord.html('Gæt ordet')
      }
      //modtag ordet fra drawings arrayet
      drawingWord.html(obj.word)
      //Skift til spilsiden og spillet starter
      shiftPage('#play')
      //Start timer
    })
    
    //Når klienten modtager koordinaterne tilbage fra serveren, skal de vises
    clientSocket.on('draw', obj => {
      //Vi tegner ellipser ud fra det obj, som vi får fra serveren. Dvs, når tegneren dragger musen hen ad canvas, tegner den ellipser på mouseX og mouseY.
      noStroke()
      fill('white')
      ellipse(obj.x, obj.y, 10, 10)
    })
    
    
    //vis resultat
    clientSocket.on('result', w => {
      console.log('got result, winner is ', w)
      winner.html(w)
      shiftPage('#result')
      restartButton.mousePressed(()=>clientSocket.emit('restart'))
    })
  })
}

//Når klient dragger musen
function mouseDragged(){
  //Vi laver et json obj med musepositionerne på skærmen og sender det til serveren
  let obj = {
    x: mouseX,
    y: mouseY
  }
  clientSocket.emit('coords', obj)
}

function shiftPage(pageId){
  select(currentPage).removeClass('show')
  select(pageId).addClass('show')
  currentPage = pageId
}

function initVars(){
  nameInput = select('#nameInput')
  nameButton = select('#nameButton')
  rejectButton = select('#rejectButton')
  lobbyText = select('#lobbyText')
  drawingWord = select('#drawingWord')
  timer = select('#timer')
  canvas = select('#canvas')
  chat = select('#chat')
  chatBox = select('#chatBox')
  guessInput = select('#guessInput')
  guessButton = select('#guessButton')
  winner = select('#winner')
  restartButton = select('#restartButton')
}

