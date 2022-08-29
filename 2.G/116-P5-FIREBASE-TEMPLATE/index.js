//model - lokal kopi af databasen
let model = {}

//view - den visning VI NU har valgt at lave af data
let htmlWords

//other html elements
let saveButton

function setup(){
    //opret reference til html view
    htmlWords = select('#words')

    //opret reference til andre html elementer
    saveButton = select('#saveButton')

    //vi vil ikke have noget p5 canvas
    noCanvas()

    //controller
    db.collection('diary-model').doc('diary-id')
        .onSnapshot( doc => {
            console.log('Modtog data: ', doc.id)
            console.log('Og data er: ', doc.data())

            //opdater model
            model = doc.data()
            
            //opdater view
            htmlWords.html('')
            model.days.map( (day, index) => updateView( day, index ) )

            //Når der kommer input fra slutbrugeren, opdateres MODELLEN
                
                //console.log(htmlWords.html())
                model.words = htmlWords.html()
            })
        

    //updater database med model
    saveButton.mousePressed( () => {
        console.log('updating database with model');
        db.collection('diary-model').doc('diary-id').update(model)
    } )
}

function updateView( day, index ){
    let newDay = createDiv()
        .addClass('day')
    let newDate = createElement('h3', day.date)
        .addClass('date')
    let newInput = createElement('textArea', day.words)
        .addClass('words')
        .input( () => model.days[index].words = newInput.value() )
    newDay.child(newDate)
    newDay.child(newInput)
    htmlWords.child(newDay)
}



function draw(){
    //console.log(htmlWords.elt.scrollTop, htmlWords.elt.scrollHeight)
}