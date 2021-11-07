input = document.querySelector('#input')
main = document.querySelector('main')

document.querySelector('#searchicon').addEventListener('click', () => {
    document.querySelector('#searchbar').classList.add('show')
})

document.querySelector('#closeicon').addEventListener('click', () => {
    document.querySelector('#searchbar').classList.remove('show')
})
//ASYNKRON FUNKTION

let data

fetch("data/characters.json")
    .then(res => res.json())
    .then(json => {
        data = json.characters
        document.querySelector('#title').innerHTML = json.description
        json.characters.map( character => {
            newCard(character)
        })
    })

const newCard = (character) => {
    let card = document.createElement('div')
    let heading = document.createElement('h2')
    let info = document.createElement('div')
    card.classList.add('card')
    info.classList.add('info')

    heading.innerHTML = character.name
    let list = ''
    character.qualities.map( member => list += '<li>' + member + '</li>')
    info.innerHTML = list

    card.append(heading)
    card.append(info)
    document.querySelector('main').append(card)
}

input.addEventListener('input', () => {
    let result = data.filter( character => character.name.toLowerCase().includes(input.value.toLowerCase()) )
    main.innerHTML = ''
    result.map( character => newCard(character) )
})