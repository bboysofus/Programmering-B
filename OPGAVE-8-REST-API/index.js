let title = document.querySelector('#title')
let participants = document.querySelector('#participants')
let acc = document.querySelector('#acc')
let price = document.querySelector('#price')
let cat = document.querySelector('#cat')

let participantSelect = document.querySelector('#participant-select')

const getActivity = () => {
    title.innerHTML = ''
    participants.innerHTML = ''
    acc.innerHTML = ''
    price.innerHTML = ''
    cat.innerHTML = ''

    fetch('https://www.boredapi.com/api/activity'
    +participantSelect.value
    )


        .then( response => response.json() )
            .then( json => {
                console.log(json)
                createCard(json)
            } )    
}

const createCard = a => {
    document.querySelector('#title').innerHTML = a.activity
    document.querySelector('#participants').innerHTML = 'Participants: ' + a.participants
    document.querySelector('#acc').innerHTML = 'Type: ' + a.type
    document.querySelector('#price').innerHTML = 'Price: ' + a.price
    document.querySelector('#cat').innerHTML = 'Key: ' + a.key
}

getActivity()

document.querySelector('#fetch').addEventListener('click', getActivity)