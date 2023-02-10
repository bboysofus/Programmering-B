let borders
let borderTop
let borderLeft
let borderRight
let borderBottom
let fiveElementDiv

let openButton
let closeButton

let gameSelect

function setup(){
    noCanvas()
    borders = selectAll('.border')
    borderTop = select('#borderTop')
    borderLeft = select('#borderLeft')
    borderRight = select('#borderRight')
    borderBottom = select('#borderBottom')
    fiveElementDiv = select('#fiveElement')

    openButton = select('#openButton')
    closeButton = select('#closeButton')

    gameSelect = select('#gameSelect')

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

    openButton.mouseClicked(()=>{
        openAnim()
    })

    closeButton.mouseClicked(()=>{
        closeAnim()
    })
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
                            gameSelect.addClass('openInnerPageClass')

                            borderLeft.removeClass('anim1DoneClass')
                            borderLeft.addClass('openChild2Class')
                            borderRight.removeClass('anim1DoneClass')
                            borderRight.addClass('openChild2Class')

                            borderTop.removeClass('anim1k1DoneClass')
                            borderTop.addClass('openChild1Class')
                            borderBottom.removeClass('anim1k1DoneClass')
                            borderBottom.addClass('openChild1Class')

                            setTimeout(() => {
                                borders.map( c => c.elt.style.backgroundColor = '#F70101')
                            }, 1000);
                        }, 1000);
                    }, 200);
                }, 100);
            }, 200);
        }, 100);
    }, 200)
}



function openAnim(){
    console.log('opening');

    gameSelect.removeClass('closeInnerPageClass')
    gameSelect.addClass('openInnerPageClass')

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
    console.log('closing');
    
    gameSelect.removeClass('openInnerPageClass')
    gameSelect.addClass('closeInnerPageClass')

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
}
