//model
let model = ''
//view
let htmlWords
//other html elements
let saveButton

function setup(){
    //Opret reference til html view
    htmlWords = select('#words')
    //opret reference til andre html-elementer
    saveButton = select('#save-button')
    noCanvas()
    //controller
    db.collection('my-diary').doc('diary')
        .onSnapshot( doc => {
            console.log('Modtog data: ', doc.id);
            console.log('Og data er: ', doc.data());
            //opdater model
            model = doc.data()
            //opdater view
            htmlWords.html(model.words)
            htmlWords.input(()=>{
                //console.log(htmlWords.html());
                model.words = htmlWords.html()
            })
        } )
        //uddate database with model
        saveButton.mouseClicked(()=>{
            db.collection('my-diary').doc('diary').update(model)
        })
}