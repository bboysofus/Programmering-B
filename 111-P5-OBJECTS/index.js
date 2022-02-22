let viktor, lukas

let students = ['Marius', 'Bjarke', 'Bjørn', 'Mie']
let balls = []

function setup(){
    createCanvas(windowWidth, 400)
    background('hotpink')
    students.map(student => {
        let b = new Ball(random(10, 40), random(width), random(0, 10), 'red', student)
        balls.push(b)
    })
}

function draw(){
    background('hotpink')
    balls.map(student => {
        student.show()
        student.update()
    })
}

function keyPressed(key){
    if(key.key == ' '){
        this.velocity -= this.updrift
    }
}