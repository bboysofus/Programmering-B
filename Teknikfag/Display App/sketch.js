let canvas 
let ballgameStarted = false

//ballgame stuff
let x, y, diameter
let gravity = 1
let friction = .97   
let velocity = 0
let updrift = 25
let rectX, rectY, rectW, rectH
let rectSpeed = 10
let score = 0
let bird1, bird2, bird3, bird4, bird5
const animRate = 50

let borders


function preload() {
    bird1 = loadImage('assets/bird-1.png')
    bird2 = loadImage('assets/bird-2.png')
    bird3 = loadImage('assets/bird-3.png')
    bird4 = loadImage('assets/bird-4.png')
    bird5 = loadImage('assets/bird-5.png')
}



function setup(){
    borders = select('.border')
    canvas = createCanvas(windowWidth, windowHeight)
    background('orange')
    //MQTT STUFF
    //forsøg at oprette forbindelse til MQTT serveren 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    //hvis forbindelsen lykkes kaldes denne funktion
    client.on('connect', (m) => {
        console.log('Client connected: ', m)
        console.log('You are now connected to mqtt.nextservices.dk')
    })
    
    client.subscribe('joystick')

    client.on('joystick', ms => {

    })

    client.on('startAnimation', ms => {
        animateLights()
    })

    //test
    animateLights()

    //BALLGAME STUFF
    x = windowWidth/2
    diameter = 133
    y = diameter/2
    rectW = 20
    rectH = 100
    rectX = windowWidth
    rectY = windowHeight - rectH

}

//når vi får mqtt besked om at starte
function animateLights(){
    lightstrip = select('#lightstrip')
    let circles = selectAll('.circle')
    console.log(circles)
    circles.reverse().map((c, i) => {
        setTimeout(()=>fadeCircle(c, i), i * 200)
    })
}

function fadeCircle(c, i){
    let circles = selectAll('.circle')
    c.addClass('fadeInClass')
    if(i==5){
        setTimeout(()=>{
            circles.map( c => c.removeClass('fadeInClass'))
            circles.map( c => c.addClass('fadeOutClass'))
            fadeFiveElement()
        }, 200)
    }
}

function fadeFiveElement(){
    for (var i = 0; i < borders.length; i++){
        borders[i].elt.style.opacity = '100%'
    }
    split()
}

function split(){
    let fiveElementDiv = select('#fiveElement')
    fiveElementDiv.elt.style.width = '16rem'
    fiveElementDiv.elt.style.height = '16rem'
}

function draw(){
    if(ballgameStarted){
        background('orange')
        show()
        update()
        showRect()
        updateRect()
        select('#info').html(score)
        collission()
    }
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
    ellipseMode(CENTER)
    imageMode(CENTER)
    ellipse(x, y, diameter)
    let a = frameCount % animRate / 10
    if(a <= 1)image(bird1, x, y)
    if(a >= 1 && a < 2)image(bird2, x, y)
    if(a >= 2 && a < 3)image(bird3, x, y)
    if(a >= 3 && a < 4)image(bird4, x, y)
    if(a >= 4)image(bird5, x, y)
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
        score += 4
        //velocity = -velocity
    }
}

function collission(){
    //cirklens nederste punkt er x, y + diameter/2
    //ciklens øverste punkt er x, y - diameter/2
    if(x > rectX && x < rectX + rectW){
        if(y < rectH || y > windowHeight - rectH){
            score -= 1
        }
    }
}
function shift (newPage) {
    select(newPage).addClass('show')
    select(currentPage).removeClass('show')
    currentPage = newPage
    if(newPage = '#boldspil'){
        select('#ballgame').child(canvas)
        ballgameStarted = true
    }
}    

function keyPressed(key) {
    if (key.key == 1) shift('#splash')
    if (key.key == 2) shift('#boldspil')
    if (key.key == 3) shift('#task')
    console.log(key.key)
    if(key.key == 'ArrowUp'){
        velocity -= updrift
    }    
  }