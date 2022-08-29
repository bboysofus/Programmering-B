let x
let y
let player

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(60)
    
    x = windowWidth/2
    y = windowHeight/2
    

    console.log('setup done')
}

function sides(){
    if(y <= 0){
        y += 5
    }
    else if(y >= windowHeight){
        y -= 5
    }
}

function movePlayer(){
    if(keyIsDown(38)){
        y -= 5
    }
    else if(keyIsDown(40)){
        y += 5
    }

    if(keyIsDown(39)){
        x += 5
    }
    else if(keyIsDown(37)){
        x -= 5
    }
}

function draw(){
    background('red')

    movePlayer()
    sides()
        
    strokeWeight(5)
    ellipse(x, y, 100)
}

