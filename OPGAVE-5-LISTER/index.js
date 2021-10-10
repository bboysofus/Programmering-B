let body = document.querySelector('body')
let musik = ['EARFQUAKE', 'Hey You', 'Introvert', 'Jail', 'Jagt', 'Wet Dreamz', 'CORSO']

musik.map(sang => {
    let card = document.createElement('div')
    card.classList.add('card')

    let top = document.createElement('top')
    top.classList.add('top')

    let bottom = document.createElement('bottom')
    bottom.classList.add('bottom')

    let h = document.createElement('h1')
    h.innerHTML = sang

    let p = document.createElement('p')
    p.innerHTML = 'Find den på Spotify!'
    p.style.fontSize = '1.5rem'

    card.append(top)
    card.append(bottom)
    top.append(h)
    bottom.append(p)

    body.append(card)
})