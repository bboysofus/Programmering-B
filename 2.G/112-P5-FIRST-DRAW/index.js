console.log('scriptet loaded')
let go = false

function setup(){
    frameRate(60)
    console.log('setup')
    createCanvas(windowWidth, windowHeight)
    background('green')
}

function draw(){
    select("#info").html(frameCount % 60)
    
    let xColor = map(mouseX, 0, windowWidth, 0, 255)
    
    if(go){
        noStroke()
        fill(xColor, 100, 1)
        ellipse(mouseX, mouseY, 100, 100)
    }
    //mouseX mouseY frameCount map
    
}

function mousePressed(){
    go = true
}

function mouseReleased(){
    go = false
}