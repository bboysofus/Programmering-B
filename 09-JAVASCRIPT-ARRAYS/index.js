let main = document.querySelector('main')
let input = document.getElementById('search')

const addCard = name =>{
    let newCard = document.createElement('div')
    newCard.classList.add('card')
    let newH = document.createElement('h1')
    newH.innerHTML = name
    newCard.append(newH)
    main.append(newCard)
}

//Vi vil gerne lave et array med tekst variabler
let names = ['Andreas', 'Theis', 'Mie', 'Bjørn', 'Malthe', 'Linus', 'Emil', 'Viktor', 'Bjarke', 'Marius', 'Mark',]

names.push('Kongen')

names.map( name => addCard(name) )

input.addEventListener('input', () => {
    let results = names.filter( name => name.toLowerCase().includes(input.value.toLowerCase()) )
    main.innerHTML = ''
    results.map( name => addCard(name) )
})











//her er et for loop
//for(let i = 0; i < names.length; i++) {
//    console.log(names[i])
//}