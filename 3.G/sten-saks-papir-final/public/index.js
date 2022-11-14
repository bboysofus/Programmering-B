let clientSocket
let currentPage = '#lobby'
let nameInput, nameButton, myName, rejectButton, lobbyText, timer, stone, scissor, paper, player1, player1Choice, player2, player2Choice, winner, restartButton

function setup(){
  noCanvas()
  //log på serveren 
  clientSocket = io.connect()
  initVars()
  shiftPage('#name')


  //få besked om du er med eller om du må vente
  clientSocket.on('join', ok => {
    if(ok){
      console.log('got ok to join, showing namepage')
      shiftPage('#name')
    }else{
      shiftPage('#reject')
    }
  })

  //håndter reject
  rejectButton.mousePressed(()=>{
    window.location.reload()
  })

  //håndter navn
  nameButton.mousePressed(()=>{
    if(nameInput.value() != ''){
      clientSocket.emit('name', nameInput.value())
      myName.html(nameInput.value())
      lobbyText.html('Venter på spillere')
      shiftPage('#lobby')
    }else{
      confirm('indtast et navn')
    }
    
    //start spil
    clientSocket.on('play', () => {
      console.log('got play, starting game')
      shiftPage('#play')
    })
    
    //håndter valg
    stone.mousePressed(()=>choice('stone'))
    scissor.mousePressed(()=>choice('scissor'))
    paper.mousePressed(()=>choice('paper'))
    
    function choice(choice) {
      clientSocket.emit('choice', choice)
      lobbyText.html('Lad os se...')
      shiftPage('#lobby')
    }
    
    //vis resultat
    clientSocket.on('result', w => {
      console.log('got result, winner is ', w)
      winner.html(w)
      shiftPage('#result')
      restartButton.mousePressed(()=>clientSocket.emit('restart'))
    })
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
  myName = select('#myName')
  rejectButton = select('#rejectButton')
  lobbyText = select('#lobbyText')
  timer = select('#timer')
  stone = select('#stone')
  scissor = select('#scissor')
  paper = select('#paper')
  player1 = select('#player1')
  player1Choice = select('#player1Choice')
  player2 = select('#player2')
  player2Choice = select('#player2Choice')
  winner = select('#winner')
  restartButton = select('#restartButton')
}

