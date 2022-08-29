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

fetch("data/birds.json")
    .then(res => res.json())
    .then(json => {
        data = json.birds
        document.querySelector('#title').innerHTML = json.description
        json.birds.map( bird => {
            newCard(bird)
        })
    })

const newCard = (bird) => {
    let card = document.createElement('div')
    let heading = document.createElement('h2')
    let members = document.createElement('div')
    card.classList.add('card')
    members.classList.add('members')

    heading.innerHTML = bird.family
    let list = ''
    bird.members.map( member => list += '<li>' + member + '</li>')
    members.innerHTML = list

    card.append(heading)
    card.append(members)
    document.querySelector('main').append(card)
}

input.addEventListener('input', () => {
    let result = data.filter( bird => bird.family.toLowerCase().includes(input.value.toLowerCase()) )
    main.innerHTML = ''
    result.map( bird => newCard(bird) )
})