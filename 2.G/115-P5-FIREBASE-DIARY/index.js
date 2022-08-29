//model
let model = {}
//view
let htmlWords
//other html elements 
let saveButton

function setup(){
    //opret reference til html view
    htmlWords = select('#words')

    //opret reference til andre html elementer 
    saveButton = select('#saveButton')
    noCanvas()
    //controller
    db.collection('my-diary').doc('diary')
        .onSnapshot( doc => {
            console.log('Modtog data: ', doc.id)
            console.log('Og data er: ', doc.data())
            //opdater model
            model = doc.data()
            //opdater view
            htmlWords.html(model.words)
            htmlWords.elt.scrollTop = htmlWords.elt.scrollHeight
            htmlWords.input(()=>{
                //console.log(htmlWords.html())
                model.words = htmlWords.html()
            })
        })
    //update database with model
    saveButton.mousePressed(()=>{
        console.log('updating with model: ', model)
        db.collection('my-diary').doc('diary').update(model)
    })
    
}

function draw(){
    //console.log(htmlWords.elt.scrollTop, htmlWords.elt.scrollHeight)
}