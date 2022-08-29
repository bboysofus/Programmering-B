let body = document.querySelector('body')
let main = document.querySelector('main')
let musikListe = ['EARFQUAKE', 'Hey You', 'Introvert', 'Jail', 'Jagt', 'Wet Dreamz', 'CORSO']
let search = document.getElementById('search')

musikListe.push('Latch')

const addCard = nummer => {
    
        let newCard = document.createElement('div')
        newCard.classList.add('card')

        let top = document.createElement('div')
        top.classList.add('top')

        let bottom = document.createElement('div')
        bottom.classList.add('bottom')

        let h = document.createElement('h1')
        h.innerHTML = nummer

        let p = document.createElement('p')
        p.innerHTML = 'Find den på Spotify!'
        p.style.fontSize = '1.5rem'

        newCard.append(top)
        newCard.append(bottom)
        top.append(h)
        bottom.append(p)

        main.append(newCard)

        for(let i = 0; i < 20; i++) {
            newCard.style.animation = 'anim'
            newCard.style.animationDuration = '.3s'
            document.querySelector('main').append(newCard)
        }
    }


musikListe.map( nummer => addCard(nummer) )

search.addEventListener('input', () => {
    let results = musikListe.filter(nummer => nummer.toLowerCase().includes(search.value.toLowerCase()))
    main.innerHTML = ''
    results.map(nummer => addCard(nummer))
})

