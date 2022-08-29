let x, y, diameter
let gravity = 1
let friction = .97   
let velocity = 0
let updrift = 25
let rectX, rectY, rectW, rectH
let rectSpeed = 10
let score = 0

let bird1, bird2, bird3, bird4, bird5, bird6, bird7, bird8, bird9, bird10, bird11, bird12, bird13, bird14
const animRate = 50

function preload() {
    bird1 = loadImage('assets/Bird1.png');
    bird2 = loadImage('assets/Bird2.png');
    bird3 = loadImage('assets/Bird3.png');
    bird4 = loadImage('assets/Bird4.png');
    bird5 = loadImage('assets/Bird5.png');
    bird6 = loadImage('assets/Bird6.png');
    bird7 = loadImage('assets/Bird7.png');
    bird8 = loadImage('assets/Bird8.png');
    bird9 = loadImage('assets/Bird9.png');
    bird10 = loadImage('assets/Bird10.png');
    bird11 = loadImage('assets/Bird11.png');
    bird12 = loadImage('assets/Bird12.png');
    bird13 = loadImage('assets/Bird13.png');
    bird14 = loadImage('assets/Bird14.png');
  }

function setup(){
    createCanvas(windowWidth, windowHeight)
    frameRate(60)
    background('green')
    x = windowWidth/2
    diameter = 180
    y = diameter/2
    rectW = 20
    rectH = 100
    rectX = windowWidth
    rectY = windowHeight - rectH
    noStroke()
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
}

function show(){
    imageMode(CENTER)
    ellipseMode(CENTER)
    ellipse(x, y, diameter)
    let a = frameCount % animRate / 10
    if(a < 1) image(bird1, x, y)
    if(a >= 1 && a < 2) image(bird2, x, y)
    if(a >= 2 && a < 3) image(bird3, x, y)
    if(a >= 3 && a < 4) image(bird4, x, y)
    if(a >= 4 && a < 5) image(bird5, x, y)
    if(a >= 5 && a < 6) image(bird6, x, y)
    if(a >= 6 && a < 7) image(bird7, x, y)
    if(a >= 7 && a < 8) image(bird8, x, y)
    if(a >= 8 && a < 9) image(bird9, x, y)
    if(a >= 9 && a < 10) image(bird10, x, y)
    if(a >= 10 && a < 11) image(bird11, x, y)
    if(a >= 11 && a < 12) image(bird12, x, y)
    if(a >= 12 && a < 13) image(bird13, x, y)
    if(a >= 13) image(bird14, x, y)
}

function update(){
    velocity += gravity
    velocity *= friction
    y += velocity 

    if(y > windowHeight - diameter/2){
        y = windowHeight - diameter/2
        velocity = -velocity
    }

    if(y < diameter/2){
        y = diameter/2
        velocity = -velocity
        score += 4
    }
}

function collission(){
    //cirklens nederste punkt er x, y + diameter/2
    //cirklens nederste punkt er x, y - diameter/2
    if(x > rectX && x < rectX + rectW){
        if(y < rectH || y > windowHeight - rectH){
            score -= 1
        }
    }
}

function draw(){
    background('green')
    show()
    update()
    showRect()
    updateRect()
    collission()
    select('#info').html(score)
}

function keyPressed(key){
    if(key.key == ' '){
        velocity -= updrift
    }
}
