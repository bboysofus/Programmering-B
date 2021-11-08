let activity

const getActivity = () => {
    fetch('https://www.boredapi.com/api/activity')
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