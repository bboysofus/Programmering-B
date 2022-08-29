let Marius = {
    id: 'Id: 456',
    name: 'Name: Marius',
    age: 'Age: ' + 17,
    hobbies: ['Football', ' cubing', ' gaming'],
    favoriteColor: 'Blue',
    favoriteAnimal: 'Animal: Snail'
}

let Bjarke = {
    id: 'Id: 001',
    name: 'Name: Bjarke',
    age: 'Age: ' + 18,
    hobbies: ['LOL', ' Jump King', ' running', ' work out'],
    favoriteColor: 'Green',
    favoriteAnimal: 'Animal: Giraffe',
}

let people = [Marius, Bjarke, {
    name: 'Name: Mie',
    age: 'Age: ' + 17,
    id: 'Id: 010',
    hobbies: ['Cubing ', ' sleeping ', ' hair dying '],
    favoriteColor: 'Pink',
    favoriteAnimal: 'Animal: Bird',
    birthDate: 'April 10th'
}, {
    name: 'Name: Bjørn',
    age: 'Age: ' + 17,
    id: 'Id: 1239',
    hobbies: ['Durum', ' din mor ', ' gaming', ' drinking'],
    favoriteColor: 'Purple',
    favoriteAnimal: 'Animal: Turtle',
    birthDate: 'August 19th'
}]

people.map(person => {
    let newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.style.backgroundColor = person.favoriteColor
    newCard.innerHTML = person.name + '<br>' + person.age + '<br>' + person.favoriteAnimal + '<br>' + person.hobbies + '<br>' + person.id

    document.querySelector('body').append(newCard)

    for(let i = 0; i < 20; i++) {
        newCard.style.animation = 'anim'
        newCard.style.animationDuration = '1s'
    }
})

