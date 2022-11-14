let clientSocket
let currentPage = '#lobby'
let nameInput, nameButton, drawingWord, rejectButton, lobbyText, timer, winner, restartButton, guessButton, canvas, guessInput, chat, chatBox, go, thickness
let c

function setup(){
  frameRate(400)
  //laver et canvas til "tegning"
  c = createCanvas(500, 500)
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

    //Når begge spillere har indtastet navn, skal spil starte. Server sender to roller til klienter, som skal fordeles
    clientSocket.on('play', obj =>{
      console.log('got play, starting game ' + obj.role)
      console.log('Got the word: ' + obj.word);
      //uddel rollerne guesser og drawer
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
    
    //start spil
    clientSocket.on('draw', obj => {
      noStroke()
      fill('white')
      ellipse(obj.x, obj.y, 20, 20)
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

function mouseDragged(){
  console.log('sending coords ', mouseX)
  let obj = {
    x: mouseX,
    y: mouseY
  }
  clientSocket.emit('coords', obj)
}

if(go){
  clientSocket.emit('tegning', koordinater => {
    noStroke()
    fill('black')
    circle(mouseX, mouseY, thickness, thickness)
  })
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

