let borders
let borderTop
let borderLeft
let borderRight
let borderBottom
let fiveElementDiv

let startVar = 0

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
let doneVar = 0
let preVar = 0
let joystickDone = 0
let buttonDone = 0

let red
let green
let blue


//Alle lydklip
let indenStart = new Audio('./assets/Lydfiler/indenStart.mp3')
let mqttExplain = new Audio('./assets/Lydfiler/mqttExplain.mp3')
let knapspilStart = new Audio('./assets/Lydfiler/knapspilStart.mp3')
let knapspilWrong = new Audio('./assets/Lydfiler/knapspilWrong.mp3')
let knapspilWin = new Audio('./assets/Lydfiler/knapspilWin.mp3')
let joystickStartAudio = new Audio('./assets/Lydfiler/joystickStartAudio.mp3')
let joystickWin = new Audio('./assets/Lydfiler/joystickWin.mp3')
let joystickLose = new Audio('./assets/Lydfiler/joystickLose.mp3')
let slut = new Audio('./assets/Lydfiler/Slut.mp3')

function setup(){

    select('#startAudio').mousePressed(()=>{
        select('#startAudio').hide()
        preVar = 1
    })

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

    red = select('#red')
    green = select('#green')
    blue = select('#blue')

    canvas = createCanvas(275, 670)
    canvas.hide()

    //MQTT STUFF
    //forsøg at oprette forbindelse til MQTT serveren 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    //hvis forbindelsen lykkes kaldes denne funktion
    client.on('connect', (m) => {
        console.log('Client connected: ', m)
        console.log('You are now connected to mqtt.nextservices.dk')
    })
    
    client.subscribe('joystick')
    client.subscribe('knapspil')
    client.subscribe('start')


    client.on('joystick', ms => {

    })

    client.on('message', (topic, message) => {
        if(topic == 'start' && startVar == 0){
            animateLights()
            mqttExplain.play()
            indenStart.pause();
            indenStart.currentTime = 0;
            startVar = 1
            console.log('Start');
        }
    })

    client.on('message', (topic, message) => {
        if(topic == 'knapspil' && message == 'forkert'){
            preVar = 2
            knapspilWrong.play()
            console.log('wrong');
            setTimeout(() => {
                sequenceStart()
            }, 4000);
        }

        if(topic == 'knapspil' && message == 'rigtig'){
            knapspilWin.play()
            console.log('correct');
            closeAnimVar2 = 1
            select('#buttonsCheckSign').style('opacity', '100%')

            setTimeout(() => {
                buttonGame.style('opacity', '0%')
                buttonGame.style('visibility', 'hidden')

                setTimeout(() => {
                    closeAnim()

                    setTimeout(() => {
                        buttonGame.style('zIndex', '-100')
                        gameSelect.style('zIndex', '100')
                        select('#buttons').style('border', '4px #05f701 solid')
                        select('#overlay2').style('backgroundColor', '#2af7017c')
                        openAnim()

                        setTimeout(() => {
                            gameSelect.style('opacity', '100%')
                            gameSelect.style('visibility', 'visible')
                            buttonDone = 1
                            if(joystickDone == 1){
                                doneVar = 1
                            }
                        }, 1000);
                    }, 1000);
                }, 500);
            }, 3000);
        }
    })

    joystick.mousePressed(()=>{
        mqttExplain.pause();
        mqttExplain.currentTime = 0;
        if(closeAnimVar1 == 0){
            joystickStartAudio.play()
            gameSelect.style('opacity', '0%')
            gameSelect.style('visibility', 'hidden')

            setTimeout(() => {
                closeAnim()

                setTimeout(() => {
                    openAnim()

                    setTimeout(() => {
                        joystickGame.style('opacity', '100%')
                        joystickGame.style('visibility', 'visible')

                        setTimeout(() => {
                            select('#joystickStartDiv').style('opacity', '100%')
                        }, 5000);
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
                select('#joystickStartDiv').style('opacity', '0%')
                canvas.show()
                ballgameStarted = true
            }
        }
    )

    buttons.mousePressed(()=>{
        mqttExplain.pause();
        mqttExplain.currentTime = 0;
        if(closeAnimVar2 == 0){
            knapspilStart.play()
            closeAnimVar2
            gameSelect.style('opacity', '0%')
            gameSelect.style('visibility', 'hidden')
            setTimeout(() => {
                closeAnim()
                setTimeout(() => {
                    openAnim()
                    setTimeout(() => {
                        buttonGame.style('opacity', '100%')
                        buttonGame.style('visibility', 'visible')

                        setTimeout(() => {
                            select('#buttonsStartDiv').style('opacity', '100%')
                        }, 5500);
                    }, 1000);
                }, 1000);
            }, 500);
        }
    })

    buttonsStart.mousePressed(
        ()=>{
            if(closeAnimVar2 == 0){
                console.log('show buttons game')
                select('#buttonsStartDiv').style('opacity', '0%')
                buttonGame.style('backgroundColor', 'rgba(0, 0, 0, 0)')

                setTimeout(() => {
                    select('#gameDiv').style('visibility', 'visible')
                    select('#gameDiv').style('opacity', '100%')

                    setTimeout(() => {
                        sequenceStart()

                        setTimeout(() => {
                            client.publish('knapspil', 'start')
                        }, 2500);
                    }, 500);
                }, 500);
            }
        }
    )

    background('orange')
    
    //test
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
    c.removeClass('fadeOutClass')
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

function shutDownAnim1(){
    fiveElementDiv.removeClass('closeParentClass')

    borderLeft.removeClass('closeChild2Class')
    borderLeft.addClass('assemble1Class')
    borderRight.removeClass('closeChild2Class')
    borderRight.addClass('assemble1Class')
    
    borderTop.removeClass('closeChild1Class')
    borderTop.addClass('assemble2Class')
    borderBottom.removeClass('closeChild1Class')
    borderBottom.addClass('assemble2Class')

    setTimeout(() => {
        borderRight.elt.style.top = null
        borderLeft.elt.style.bottom = null
        borderTop.elt.style.top = '0'
        borderTop.elt.style.bottom = null
        borderBottom.elt.style.bottom = '0'
        borderBottom.elt.style.top = null

        borderLeft.removeClass('assemble1Class')
        borderRight.removeClass('assemble1Class')
        borderLeft.addClass('startRotate1Class')
        borderRight.addClass('startRotate1Class')

        borderTop.removeClass('assemble2Class')
        borderBottom.removeClass('assemble2Class')
        borderTop.addClass('startRotate2Class')
        borderBottom.addClass('startRotate2Class')

        setTimeout(() => {
            borderLeft.removeClass('startRotate1Class')
            borderRight.removeClass('startRotate1Class')
            borderLeft.addClass('rotate1Class')
            borderRight.addClass('rotate1Class')

            borderTop.removeClass('startRotate2Class')
            borderBottom.removeClass('startRotate2Class')
            borderTop.addClass('rotate1k1Class')
            borderBottom.addClass('rotate1k1Class')

            setTimeout(() => {
                borderRight.elt.style.right = '0'
                borderRight.elt.style.left = null
                borderLeft.elt.style.left = '0'
                borderLeft.elt.style.right = null
                borderTop.elt.style.left = '0'
                borderTop.elt.style.right = null
                borderBottom.elt.style.right = '0'
                borderBottom.elt.style.left = null

                borderLeft.removeClass('rotate1Class')
                borderRight.removeClass('rotate1Class')
                borderLeft.addClass('rotate2Class')
                borderRight.addClass('rotate2Class')

                borderTop.removeClass('rotate1k1Class')
                borderBottom.removeClass('rotate1k1Class')
                borderTop.addClass('rotate2k1Class')
                borderBottom.addClass('rotate2k1Class')

                setTimeout(() => {
                    borderLeft.removeClass('rotate2Class')
                    borderRight.removeClass('rotate2Class')
                    borderLeft.addClass('rotate3Class')
                    borderRight.addClass('rotate3Class')

                    borderTop.removeClass('rotate2k1Class')
                    borderBottom.removeClass('rotate2k1Class')
                    borderTop.addClass('rotate3k1Class')
                    borderBottom.addClass('rotate3k1Class')
                    setTimeout(() => {
                        borderBottom.elt.style.bottom = null
                        borderBottom.elt.style.top = '0'
                        borderTop.elt.style.top = null
                        borderTop.elt.style.bottom = '0'
                        borderLeft.elt.style.top = null
                        borderLeft.elt.style.bottom = '0'
                        borderRight.elt.style.top = '0'
                        borderRight.elt.style.bottom = null

                        borderLeft.removeClass('rotate3Class')
                        borderRight.removeClass('rotate3Class')
                        borderLeft.addClass('startRotate1Class')
                        borderRight.addClass('startRotate1Class')

                        borderTop.removeClass('rotate3k1Class')
                        borderBottom.removeClass('rotate3k1Class')
                        borderTop.addClass('startRotate2Class')
                        borderBottom.addClass('startRotate2Class')

                        setTimeout(() => {
                            borderLeft.removeClass('startRotate1Class')
                            borderRight.removeClass('startRotate1Class')
                            borderLeft.addClass('rotate1Class')
                            borderRight.addClass('rotate1Class')

                            borderTop.removeClass('startRotate2Class')
                            borderBottom.removeClass('startRotate2Class')
                            borderTop.addClass('rotate1k1Class')
                            borderBottom.addClass('rotate1k1Class')

                            setTimeout(() => {
                                borderTop.elt.style.left = null
                                borderTop.elt.style.right = '0'
                                borderBottom.elt.style.right = null
                                borderBottom.elt.style.left = '0'
                                borderRight.elt.style.right = null
                                borderRight.elt.style.left = '0'
                                borderLeft.elt.style.left = null
                                borderLeft.elt.style.right = '0'

                                borderLeft.removeClass('rotate1Class')
                                borderRight.removeClass('rotate1Class')
                                borderLeft.addClass('rotate2Class')
                                borderRight.addClass('rotate2Class')

                                borderTop.removeClass('rotate1k1Class')
                                borderBottom.removeClass('rotate1k1Class')
                                borderTop.addClass('rotate2k1Class')
                                borderBottom.addClass('rotate2k1Class')

                                setTimeout(() => {
                                    borderLeft.removeClass('rotate2Class')
                                    borderRight.removeClass('rotate2Class')
                                    borderLeft.addClass('rotate3Class')
                                    borderRight.addClass('rotate3Class')

                                    borderTop.removeClass('rotate2k1Class')
                                    borderBottom.removeClass('rotate2k1Class')
                                    borderTop.addClass('rotate3k1Class')
                                    borderBottom.addClass('rotate3k1Class')

                                    setTimeout(() => {
                                        borderBottom.elt.style.top = null
                                        borderBottom.elt.style.bottom = '0'
                                        borderTop.elt.style.bottom = null
                                        borderTop.elt.style.top = '0'
                                        borderLeft.elt.style.bottom = null
                                        borderLeft.elt.style.top = '0'
                                        borderRight.elt.style.top = null
                                        borderRight.elt.style.bottom = '0'

                                        borderLeft.removeClass('rotate3Class')
                                        borderRight.removeClass('rotate3Class')
                                        borderLeft.addClass('startRotate1Class')
                                        borderRight.addClass('startRotate1Class')

                                        borderTop.removeClass('rotate3k1Class')
                                        borderBottom.removeClass('rotate3k1Class')
                                        borderTop.addClass('startRotate2Class')
                                        borderBottom.addClass('startRotate2Class')

                                        setTimeout(() => {
                                            borderLeft.removeClass('startRotate1Class')
                                            borderRight.removeClass('startRotate1Class')
                                            borderLeft.addClass('rotate1Class')
                                            borderRight.addClass('rotate1Class')

                                            borderTop.removeClass('startRotate2Class')
                                            borderBottom.removeClass('startRotate2Class')
                                            borderTop.addClass('rotate1k1Class')
                                            borderBottom.addClass('rotate1k1Class')

                                            setTimeout(() => {
                                                borderRight.elt.style.right = '0'
                                                borderRight.elt.style.left = null
                                                borderLeft.elt.style.left = '0'
                                                borderLeft.elt.style.right = null
                                                borderTop.elt.style.left = '0'
                                                borderTop.elt.style.right = null
                                                borderBottom.elt.style.right = '0'
                                                borderBottom.elt.style.left = null

                                                borderLeft.removeClass('rotate1Class')
                                                borderRight.removeClass('rotate1Class')
                                                borderLeft.addClass('endClass')
                                                borderRight.addClass('endClass')

                                                setTimeout(() => {
                                                    shutDownAnim2()
                                                }, 1000);
                                            }, 200);
                                        }, 100);
                                    }, 200);
                                }, 100);
                            }, 200);
                        }, 100);
                    }, 200);
                }, 100);
            }, 200);
        }, 100);
    }, 700);
}

function shutDownAnim2(){
    fiveElementDiv.elt.style.width = '8.5rem'
    fiveElementDiv.elt.style.height = '8.5rem'

    setTimeout(() => {
        borders.map( c => c.elt.style.opacity = '0%')

        let circles = selectAll('.circle')

        circles.map((c, i) => {
        setTimeout(() => {
            c.removeClass('fadeOutClass')
            c.addClass('fadeInClass')

            setTimeout(() => {
                c.removeClass('fadeInClass')
                c.addClass('fadeOutClass')

                setTimeout(() => {
                    borderLeft.removeClass('endClass')
                    borderRight.removeClass('endClass')
                    borderTop.removeClass('rotate1k1Class')
                    borderBottom.removeClass('rotate1k1Class')
                    borderBottom.elt.style.bottom = '0'
                    borderBottom.elt.style.right = '0'
                    borderBottom.elt.style.left = null
                    borderBottom.elt.style.top = null
                    borderRight.elt.style.bottom = '0'
                    borderRight.elt.style.right = '0'
                    borderRight.elt.style.left = null
                    borderRight.elt.style.top = null
                    borderTop.elt.style.bottom = null
                    borderTop.elt.style.top = null
                    borderTop.elt.style.left = null
                    borderTop.elt.style.right = null
                    borderLeft.elt.style.bottom = null
                    borderLeft.elt.style.top = null
                    borderLeft.elt.style.left = null
                    borderLeft.elt.style.right = null


                    score = 0
                    joystickDone = 0
                    buttonDone = 0
                    doneVar = 0
                    startVar = 0
                    preVar = 1
                    closeAnimVar1 = 0
                    closeAnimVar2 = 0

                    buttonGame.style('zIndex', '100')
                    gameSelect.style('zIndex', '101')
                    select('#joystick').style('border', '4px #f70101 solid')
                    select('#overlay1').style('backgroundColor', '#f701017c')
                    select('#buttons').style('border', '4px #f70101 solid')
                    select('#overlay2').style('backgroundColor', '#f701017c')
                    select('#joystickCheckSign').style('opacity', '0%')
                    select('#buttonsCheckSign').style('opacity', '0%')
                    select('#joystickStartDiv').style('opacity', '0%')
                    select('#buttonsStartDiv').style('opacity', '0%')
                    select('#gameDiv').style('visibility', 'hidden')
                    select('#gameDiv').style('opacity', '0%')
                    select('#buttonsGameTitle').html('Se sekvensen')

                    joystickGame.style('backgroundColor', 'rgba(0, 0, 0, .20)')
                    joystickGame.style('opacity', '0%')
                    joystickGame.style('visibility', 'hidden')
                    buttonGame.style('backgroundColor', 'rgba(0, 0, 0, .20)')
                    buttonGame.style('opacity', '0%')
                    buttonGame.style('visibility', 'hidden')
                }, 1000);
            }, 1000);
        }, i * 200);
        })
    }, 1000);
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

function sequenceStart(){
    select('#buttonsGameTitle').html('Se sekvensen')

    setTimeout(() => {
        blue.style('backgroundColor', 'blue')
    
        setTimeout(() => {
            blue.style('backgroundColor', 'rgba(0, 0, 255, 0.2)')
            green.style('backgroundColor', 'green')
    
            setTimeout(() => {
                green.style('backgroundColor', 'rgba(0, 128, 0, 0.2)')
                blue.style('backgroundColor', 'blue')
    
                setTimeout(() => {
                    blue.style('backgroundColor', 'rgba(0, 0, 255, 0.2)')
                    red.style('backgroundColor', 'red')
    
                    setTimeout(() => {
                        red.style('backgroundColor', 'rgba(255, 0, 0, 0.2)')
                        green.style('backgroundColor', 'green')
    
                        setTimeout(() => {
                            green.style('backgroundColor', 'rgba(0, 128, 0, 0.2)')
                            blue.style('backgroundColor', 'blue')
    
                            setTimeout(() => {
                                blue.style('backgroundColor', 'rgba(0, 0, 255, 0.2)')

                                setTimeout(() => {
                                    select('#buttonsGameTitle').html('Din tur')
                                }, 300);
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    }, 500);
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
    
    if(score == 10 && closeAnimVar1 == 0){
        closeAnimVar1 = 1
        setTimeout(() => {
            joystickWin.play()
            ballgameStarted = false
            select('#joystickCheckSign').style('opacity', '100%')
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
                                joystickDone = 1
                                if(buttonDone == 1){
                                    doneVar = 1
                                }
                            }, 1000);
                        }, 1000);
                    }, 500);
                }, 13000)
            }
        }, 80);
    }

    if(joystickDone == 1 && buttonDone == 1 && doneVar == 1){
        doneVar = 0
        setTimeout(() => {
            select('#clap').style('visibility', 'visible')
            slut.play()

            setTimeout(() => {
                gameSelect.style('visibility', 'hidden')
                select('#clap').style('visibility', 'hidden')

                setTimeout(() => {
                    closeAnim()
                    borders.map( c => c.elt.style.backgroundColor = 'white')

                    setTimeout(() => {
                        shutDownAnim1()
                    }, 1000);
                }, 500);
            }, 14000);
        }, 500);
    }

    if(preVar == 1 && startVar == 0){
        preVar = 0
        setTimeout(() => {
            preVar = 1
        }, 15000);
    }
}
