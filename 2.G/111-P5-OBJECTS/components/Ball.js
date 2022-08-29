
class Ball{
    constructor(diameter, xpos, ypos, col, name){
        this.diameter = diameter
        this.xpos = xpos
        this.ypos = ypos
        this.col = col
        this.name = name

        this.gravity = 1
        this.friction = 1 - this.diameter / 1000
        this.velocity = 0
        this.updrift = 25
        this.button = createButton(this.name)
    }
    
    show(){
        this.button.position(this.xpos, this.ypos)
        this.button.mousePressed(()=>{
            if(confirm('Vil du hoppe med ' + this.name)){
                this.up()
            }
            else{
                this.radius -= 5
            }
        })
        text(this.name, this.xpos, this.ypos + this.diameter + 10)
        fill(this.col)
        ellipse(this.xpos, this.ypos, this.diameter)
    }

    update(){
        this.velocity += this.gravity
        this.velocity *= this.friction
        this.ypos += this.velocity

        if(this.ypos > height - this.diameter/2){
            this.ypos = height - this.diameter/2
            this.velocity = -this.velocity
        }
    }

    up(){
        this.velocity -= this.updrift
    }
}