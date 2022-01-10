console.log('scriptet loaded')
let go = false
let tabButton = document.querySelector("#tabButton")
let header = document.querySelector("header")
let chooseBlack = document.querySelector("#chooseBlack")
let chooseRed = document.querySelector("#chooseRed")
let chooseGreen = document.querySelector("#chooseGreen")
let chooseBlue = document.querySelector("#chooseBlue")
let chooseEraser = document.querySelector("#eraser")
let xColor = "black"

function setup(){
    frameRate(120)
    console.log('setup')
    createCanvas(windowWidth, windowHeight)
    background('white')

    d = 20

}

function draw(){
    
    select("#info").html("Chosen: " + xColor)

    
    if(go){
        noStroke()
        fill(xColor)
        ellipse(mouseX, mouseY, d, d)
    }
    //mouseX mouseY frameCount map
    
    select("#brushSize").html("Brush size: " + d)
}

function mousePressed(){
    go = true
}

function mouseReleased(){
    go = false
}

const tab = () => {
    if(tabButton.innerHTML == 'CLOSE'){
        header.style.zIndex = "-1"
        header.style.opacity = "0%"
        tabButton.innerHTML = 'OPEN'
        tabButton.style.borderRadius = "0"
        tabButton.style.border = "2px solid black"
        tabButton.style.background = "white"
        tabButton.style.color = "black"
    }
    else if(tabButton.innerHTML == 'OPEN'){
        header.style.zIndex = "5"
        header.style.opacity = "100%"
        tabButton.innerHTML = 'CLOSE'
        tabButton.style.borderRadius = "2rem"
    }
}

const blackChosen = () => {
    xColor = "black"
    chooseBlack.style.background = "rgb(0, 255, 0)"
    chooseRed.style.background = "lightblue"
    chooseGreen.style.background = "lightblue"
    chooseBlue.style.background = "lightblue"
    chooseEraser.style.background = "lightblue"
}

const redChosen = () => {
    xColor = "red"
    chooseRed.style.background = "rgb(0, 255, 0)"
    chooseBlack.style.background = "lightblue"
    chooseGreen.style.background = "lightblue"
    chooseBlue.style.background = "lightblue"
    chooseEraser.style.background = "lightblue"
}

const greenChosen = () => {
    xColor = "green"
    chooseGreen.style.background = "rgb(0, 255, 0)"
    chooseBlack.style.background = "lightblue"
    chooseRed.style.background = "lightblue"
    chooseBlue.style.background = "lightblue"
    chooseEraser.style.background = "lightblue"
}

const blueChosen = () => {
    xColor = "blue"
    chooseBlue.style.background = "rgb(0, 255, 0)"
    chooseBlack.style.background = "lightblue"
    chooseGreen.style.background = "lightblue"
    chooseRed.style.background = "lightblue"
    chooseEraser.style.background = "lightblue"
}

const eraserChosen = () => {
    xColor = "white"
    chooseEraser.style.background = "rgb(0, 255, 0)"
    chooseBlack.style.background = "lightblue"
    chooseGreen.style.background = "lightblue"
    chooseRed.style.background = "lightblue"
    chooseBlue.style.background = "lightblue"
}

function mouseWheel(event) {
    if(event.delta == -100){
        d = d + 10
    }
    else if(event.delta == 100){
        d = d - 10
    }

    console.log(event.delta);
}