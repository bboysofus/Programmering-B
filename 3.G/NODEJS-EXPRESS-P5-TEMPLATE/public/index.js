function setup(){
    frameRate(60)
    console.log('setup')
    createCanvas(windowWidth, windowHeight)
    background('green')
    select("#info").html('Sådan her skriver man noget i html dokumentet')
}

function draw(){
    //mouseX mouseY frameCount map
}

function mousePressed(){
    select("#info").html('Du klikkede')
}

function mouseReleased(){
    select("#info").html('Du slap musen')
}

function keyPressed(event){
    select("#info").html('Du trykkede på: ' + event.key)
}