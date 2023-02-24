let borders
let borderTop
let borderLeft
let borderRight
let borderBottom
let fiveElementDiv

let openButton
let closeButton

let gameSelect
let joystick
let joystickGame
let joystickStart
let buttons
let buttonGame
let buttonsStart
let joystickStartTitle
let buttonsStartTitle
let closeAnimVar1 = 0
let closeAnimVar2 = 0

function setup(){
    borders = selectAll('.border')
    borderTop = select('#borderTop')
    borderLeft = select('#borderLeft')
    borderRight = select('#borderRight')
    borderBottom = select('#borderBottom')
    fiveElementDiv = select('#fiveElement')


    gameSelect = select('#gameSelect')
    joystick = select('#joystick')
    joystickGame = select('#joystickGame')
    joystickStart = select('#joystickStart')
    buttons = select('#buttons')
    buttonGame = select('#buttonGame')
    buttonsStart = select('#buttonsStart')
    joystickStartTitle = select('#joystickStartTitle')
    buttonsStartTitle = select('#buttonsStartTitle')

    canvas = createCanvas(275, 670)
    canvas.hide()

    joystick.mousePressed(()=>{
        if(closeAnimVar1 == 0){
            gameSelect.style('opacity', '0%')
            gameSelect.style('visibility', 'hidden')
            setTimeout(() => {
                closeAnim()
                setTimeout(() => {
                    openAnim()
                    setTimeout(() => {
                        joystickGame.style('opacity', '100%')
                        joystickGame.style('visibility', 'visible')
                    }, 1000);
                }, 1000);
            }, 500);
        }
    })

    buttons.mousePressed(()=>{
        if(closeAnimVar2 == 0){
            gameSelect.style('opacity', '0%')
            gameSelect.style('visibility', 'hidden')
            setTimeout(() => {
                closeAnim()
                setTimeout(() => {
                    openAnim()
                    setTimeout(() => {
                        buttonGame.style('opacity', '100%')
                        buttonGame.style('visibility', 'visible')
                    }, 1000);
                }, 1000);
            }, 500);
        }
    })

    joystickStart.mousePressed(
        ()=>{
            if(closeAnimVar1 == 0){
                setupGame()
                console.log('show joystick game')
                joystickGame.child(canvas)
                joystickGame.style('border', 'none')
                joystickStart.style('visibility', 'hidden')
                joystickStartTitle.style('visibility', 'hidden')
                canvas.show()
                ballgameStarted = true
            }
        }
    )

    buttonsStart.mousePressed(
        ()=>{
            if(closeAnimVar2 == 0){
                console.log('show buttons game')
                buttonsStart.style('visibility', 'hidden')
                buttonsStartTitle.style('visibility', 'hidden')
                buttonGame.style('backgroundColor', 'rgba(0, 0, 0, 0)')
            }
        }
    )

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
    borders.map( c => c.elt.style.opacity = '100%')
    setTimeout(()=>{
        startAnim()
    }, 500)
}

function startAnim(){
    fiveElementDiv.elt.style.width = '16rem'
    fiveElementDiv.elt.style.height = '16rem'
    setTimeout(()=>{
        borderLeft.addClass('stretchClass')
        borderRight.addClass('stretchClass')
        
    }, 1000)

    setTimeout(()=>{
        borderBottom.elt.style.top = '0'
        borderTop.elt.style.bottom = '0'

        borderLeft.elt.style.bottom = '0'
        borderRight.elt.style.top = '0'
        rotateAnim1()
    }, 2000)
}

function rotateAnim1(){
    borderTop.addClass('startRotate1Class')
    borderBottom.addClass('startRotate1Class')

    borderLeft.removeClass('stretchClass')
    borderRight.removeClass('stretchClass')
    borderLeft.addClass('startRotate2Class')
    borderRight.addClass('startRotate2Class')
    
    setTimeout(()=>{
        borderTop.removeClass('startRotate1Class')
        borderBottom.removeClass('startRotate1Class')
        borderTop.addClass('rotate1Class')
        borderBottom.addClass('rotate1Class')
        
        borderRight.removeClass('startRotate2Class')
        borderLeft.removeClass('startRotate2Class')
        borderRight.addClass('rotate1k1Class')
        borderLeft.addClass('rotate1k1Class')
        setTimeout(()=>{
            borderRight.elt.style.left = '0'
            borderLeft.elt.style.right = '0'
            borderBottom.elt.style.left = '0'
            borderTop.elt.style.right = '0'

            borderTop.removeClass('rotate1Class')
            borderBottom.removeClass('rotate1Class')
            borderTop.addClass('rotate2Class')
            borderBottom.addClass('rotate2Class')
            
            borderRight.removeClass('rotate1k1Class')
            borderLeft.removeClass('rotate1k1Class')
            borderRight.addClass('rotate2k1Class')
            borderLeft.addClass('rotate2k1Class')

            setTimeout(() => {
                borderTop.removeClass('rotate2Class')
                borderBottom.removeClass('rotate2Class')
                borderTop.addClass('rotate3Class')
                borderBottom.addClass('rotate3Class')
                
                borderRight.removeClass('rotate2k1Class')
                borderLeft.removeClass('rotate2k1Class')
                borderRight.addClass('rotate3k1Class')
                borderLeft.addClass('rotate3k1Class')

                setTimeout(() => {
                    borderBottom.elt.style.top = null
                    borderBottom.elt.style.bottom = '0'
                    borderTop.elt.style.top = '0'
                    borderLeft.elt.style.top = '0'
                    borderRight.elt.style.top = null
                    borderRight.elt.style.bottom = '0'

                    borderTop.removeClass('rotate3Class')
                    borderBottom.removeClass('rotate3Class')
                    borderTop.addClass('startRotate1Class')
                    borderBottom.addClass('startRotate1Class')
                    
                    borderRight.removeClass('rotate3k1Class')
                    borderLeft.removeClass('rotate3k1Class')
                    borderRight.addClass('startRotate2Class')
                    borderLeft.addClass('startRotate2Class')

                    setTimeout(() => {
                        rotateAnim2()
                    }, 100);
                }, 200);
            }, 100);
        }, 200)
    }, 100)
}

function rotateAnim2(){
    borderTop.removeClass('startRotate1Class')
    borderBottom.removeClass('startRotate1Class')
    borderTop.addClass('rotate1Class')
    borderBottom.addClass('rotate1Class')
    
    borderRight.removeClass('startRotate2Class')
    borderLeft.removeClass('startRotate2Class')
    borderRight.addClass('rotate1k1Class')
    borderLeft.addClass('rotate1k1Class')

    setTimeout(()=>{
        borderRight.elt.style.left = null
        borderRight.elt.style.right = '0'
        borderLeft.elt.style.left = '0'
        borderBottom.elt.style.left = null
        borderBottom.elt.style.right = '0'
        borderTop.elt.style.left = '0'

        borderTop.removeClass('rotate1Class')
        borderBottom.removeClass('rotate1Class')
        borderTop.addClass('rotate2Class')
        borderBottom.addClass('rotate2Class')
        
        borderRight.removeClass('rotate1k1Class')
        borderLeft.removeClass('rotate1k1Class')
        borderRight.addClass('rotate2k1Class')
        borderLeft.addClass('rotate2k1Class')

        setTimeout(() => {
            borderTop.removeClass('rotate2Class')
            borderBottom.removeClass('rotate2Class')
            borderTop.addClass('rotate3Class')
            borderBottom.addClass('rotate3Class')
            
            borderRight.removeClass('rotate2k1Class')
            borderLeft.removeClass('rotate2k1Class')
            borderRight.addClass('rotate3k1Class')
            borderLeft.addClass('rotate3k1Class')

            setTimeout(() => {
                borderBottom.elt.style.bottom = null
                borderBottom.elt.style.top = '0'
                borderTop.elt.style.top = null
                borderTop.elt.style.bottom = '0'
                borderLeft.elt.style.top = null
                borderLeft.elt.style.bottom = '0'
                borderRight.elt.style.top = '0'
                borderRight.elt.style.bottom = null

                borderTop.removeClass('rotate3Class')
                borderBottom.removeClass('rotate3Class')
                borderTop.addClass('startRotate1Class')
                borderBottom.addClass('startRotate1Class')
                
                borderRight.removeClass('rotate3k1Class')
                borderLeft.removeClass('rotate3k1Class')
                borderRight.addClass('startRotate2Class')
                borderLeft.addClass('startRotate2Class')

                setTimeout(() => {
                    borderTop.removeClass('startRotate1Class')
                    borderBottom.removeClass('startRotate1Class')
                    borderTop.addClass('rotate1Class')
                    borderBottom.addClass('rotate1Class')
                    
                    borderRight.removeClass('startRotate2Class')
                    borderLeft.removeClass('startRotate2Class')
                    borderRight.addClass('rotate1k1Class')
                    borderLeft.addClass('rotate1k1Class')

                    setTimeout(() => {
                        borderTop.elt.style.left = null
                        borderTop.elt.style.right = '0'
                        borderBottom.elt.style.right = null
                        borderBottom.elt.style.left = '0'
                        borderRight.elt.style.right = null
                        borderRight.elt.style.left = '0'
                        borderLeft.elt.style.left = null
                        borderLeft.elt.style.right = '0'

                        borderTop.removeClass('rotate1Class')
                        borderBottom.removeClass('rotate1Class')
                        borderTop.addClass('anim1k1DoneClass')
                        borderBottom.addClass('anim1k1DoneClass')
                        
                        borderRight.removeClass('rotate1k1Class')
                        borderLeft.removeClass('rotate1k1Class')
                        borderRight.addClass('anim1DoneClass')
                        borderLeft.addClass('anim1DoneClass')

                        setTimeout(() => {
                            fiveElementDiv.addClass('openParentClass')
                            
                            borderLeft.removeClass('anim1DoneClass')
                            borderLeft.addClass('openChild2Class')
                            borderRight.removeClass('anim1DoneClass')
                            borderRight.addClass('openChild2Class')
                            
                            borderTop.removeClass('anim1k1DoneClass')
                            borderTop.addClass('openChild1Class')
                            borderBottom.removeClass('anim1k1DoneClass')
                            borderBottom.addClass('openChild1Class')

                            setTimeout(() => {
                                gameSelect.style('opacity', '100%')
                                gameSelect.style('visibility', 'visible')
                            }, 1000);

                            setTimeout(() => {
                                borders.map( c => c.elt.style.backgroundColor = '#F70101')
                            }, 1);
                        }, 1000);
                    }, 200);
                }, 100);
            }, 200);
        }, 100);
    }, 200)
}



function openAnim(){
    console.log('opening')

    fiveElementDiv.removeClass('closeParentClass')
    fiveElementDiv.addClass('openParentClass')

    borderLeft.removeClass('closeChild2Class')
    borderLeft.addClass('openChild2Class')
    borderRight.removeClass('closeChild2Class')
    borderRight.addClass('openChild2Class')

    borderTop.removeClass('closeChild1Class')
    borderTop.addClass('openChild1Class')
    borderBottom.removeClass('closeChild1Class')
    borderBottom.addClass('openChild1Class')
    
}

function closeAnim(){
    console.log('closing')

    fiveElementDiv.removeClass('openParentClass')
    fiveElementDiv.addClass('closeParentClass')

    borderLeft.removeClass('openChild2Class')
    borderLeft.addClass('closeChild2Class')
    borderRight.removeClass('openChild2Class')
    borderRight.addClass('closeChild2Class')

    borderTop.removeClass('openChild1Class')
    borderTop.addClass('closeChild1Class')
    borderBottom.removeClass('openChild1Class')
    borderBottom.addClass('closeChild1Class')
}

function loadAnim(){

}

function draw(){
    if(ballgameStarted){
        background('orange')
        update()
        showRect()
        updateRect()
        show()
        //select('#info').html(score)
        collission()
    }
    
    if(score == 2 && closeAnimVar1 == 0){
        setTimeout(() => {
            ballgameStarted = false
            select('#checkSign').style('opacity', '100%')
            closeAnimVar1 = 1
            if(closeAnimVar1 == 1){
                closeAnimVar1 = 2
                setTimeout(() => {
                    canvas.hide()
                    joystickGame.style('border', '1px solid black')
                    joystickGame.style('opacity', '0%')
                    joystickGame.style('visibility', 'hidden')
    
                    setTimeout(() => {
                        closeAnim()
                        
                        setTimeout(() => {
                            select('#joystick').style('border', '4px #05f701 solid')
                            select('#overlay1').style('backgroundColor', '#2af7017c')
                            openAnim()
                            setTimeout(() => {
                                gameSelect.style('opacity', '100%')
                                gameSelect.style('visibility', 'visible')
                            }, 1000);
                        }, 1000);
                    }, 500);
                }, 1000)
            }
        }, 80);
    }
}
