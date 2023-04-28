let a = false
let canvas

function setup() {
    let startScreen = select('#startScreen')
    let gameScreen = select('#gameScreen')
    canvas = createCanvas(windowWidth, windowHeight);
    gameScreen.child(canvas)
    stroke('white')
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER)
  }
  
  function draw() {
    background(230, 50, 15)
    // drawingContext.shadowOffsetX = 0;



    drawingContext.shadowColor = color('white')
    drawingContext.shadowBlur = 50;
    noFill()
    stroke(0, 0, 255, 50)
    strokeWeight(10)
    rectMode(CORNER)
    ellipse(width/2, height/2, windowHeight/2.5)
    ellipse(width, height/2, windowHeight/2.5)
    ellipse(0, height/2, windowHeight/2.5)
    // rect(width/2, windowHeight/2, 0, windowHeight/2)
    rect(width/2, 0, 0, windowHeight/2-windowHeight/5-5)
    rect(width/2, windowHeight/2+windowHeight/5+5, 0, windowHeight/2-windowHeight/5-5)
    drawingContext.shadowColor = color('white')
    
    rectMode(CENTER)

    fill('yellow')
    noStroke()
    drawingContext.shadowColor = color('yellow')
    
    rect(width/2, 0, windowWidth, 25)

    rect(width/2, height, windowWidth, 25)

    rectMode(CORNER)
    rect(width-12.5, 0, 25, windowHeight/2-windowHeight/5-5)

    rect(-12.5, 0, 25, windowHeight/2-windowHeight/5-5)

    rect(width-12.5, windowHeight/2+windowHeight/5+5, 25, windowHeight/2-windowHeight/5-5)
    
    rect(-12.5, windowHeight/2+windowHeight/5+5, 25, windowHeight/2-windowHeight/5-5)
    if(a){
        a = false
        fill('lightYellow')
        noStroke()
        drawingContext.shadowOffsetY = 25;
        drawingContext.shadowColor = color('yellow')
        // rect(-12.5, windowHeight/2+windowHeight/5+5, 25, windowHeight/2-windowHeight/5-5)
    }
    if(drawingContext.shadowOffset>0){
        drawingContext.shadowOffsetX -= .25
    }
    
    // rect(0, height, 25, 457)
    

  }

function mousePressed(){
    if(a == false){
        a = true
    }else{
        a=false
    }
}