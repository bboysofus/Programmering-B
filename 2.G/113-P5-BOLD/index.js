let x, y, diameter
let gravity = 1
let friction = 0.97
let velocity = 0
let opdrift = 25
let rectX, rectY, rectW, rectH
let rectSpeed = 10
let score = 0

function setup(){
    select("#info").html(score)
    frameRate(60)
    createCanvas(windowWidth, windowHeight)
    background('green')
    x = windowWidth/2
    diameter = 32
    y = diameter/2
    rectW = 20
    rectH = 200
    rectX = windowWidth
    rectY = windowHeight - rectH
}

function showRect(){
    rect(rectX, rectY, rectW, rectH)
    rect(rectX, 0, rectW, rectH)
}

function updateRect(){
    rectX -= rectSpeed
    if(rectX <= 0){
        rectX = windowWidth
        rectH = random(100, 300)
        rectY = windowHeight - rectH
    }
    if(rectX == windowWidth/2){
        score++
    }
}

function show(){
    ellipse(x, y, diameter)
}

function update(){
    velocity += gravity
    velocity *= friction
    y += velocity
    if(y > windowHeight - diameter/2){
        y = windowHeight - diameter/2
        velocity = -velocity
    }
    select("#info").html(velocity)
}

function draw(){
    background('green')
    show()
    showRect()
    updateRect()
    update()
    select("#info").html(score)
    //mouseX mouseY frameCount map
}

function keyPressed(key){
    console.log(key);
    if(key.key == ' '){
        velocity -= opdrift
    }
}