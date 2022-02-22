
let lukas, viktor
let balls = []

function setup(){
    noCanvas()
    background('purple')
    for(student in students) {
        let b = new Ball(random(10, 40), random(window.innerWidth), random(window.innerHeight), 'red', students[student], student)
        balls.push(b)
    }
}

function draw(){
    background('purple')
    balls.map( student => {
        student.show()
        student.update()
        if(frameCount % 23){
            student.up(random(1.5))
        }
    })  
}

function keyPressed(key){
    if(key.key == ' '){
        balls.map(item => student.up())
    }
}
