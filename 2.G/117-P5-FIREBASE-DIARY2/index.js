//model - lokal kopi af databasen
let model = {}

//view - den visning VI NU har valgt at lave af data
let htmlWords

//other html elements

function setup(){
    //opret reference til html view

    //opret reference til andre html elementer

    //vi vil ikke have noget p5 canvas
    noCanvas()

    //controller
    db.collection('/collection-name').doc('/doc-id')
        .onSnapshot( doc => {
            console.log('Modtog data: ', doc.id)
            console.log('Og data er: ', doc.data())

            //opdater model
            
            //opdater view

            //Når der kommer input fra slutbrugeren, opdateres MODELLEN
                
                //console.log(htmlWords.html())
                model.words = htmlWords.html()
            })
        

    //updater database med model
    
}

function draw(){
    //console.log(htmlWords.elt.scrollTop, htmlWords.elt.scrollHeight)
}