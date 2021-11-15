let title = document.querySelector('#title')
let participants = document.querySelector('#participants')
let acc = document.querySelector('#acc')
let price = document.querySelector('#price')
let cat = document.querySelector('#cat')

let participantSelect = document.querySelector('#participant-select')
let activitySelect = document.querySelector('#activity-select')

const getActivity = () => {
    if(participantSelect.value == '' || activitySelect.value == ''){
        alert("Please select an activity and the number of participants!")
        location.reload()
    }
    title.innerHTML = 'Loading...'
    participants.innerHTML = ''
    acc.innerHTML = ''
    price.innerHTML = ''
    cat.innerHTML = ''

    fetch('https://www.boredapi.com/api/activity'
    + '?participants=' + participantSelect.value
    + '&type=' + activitySelect.value
    )
        .then( response => response.json() )
            .then( json => {
                console.log(json)
                createCard(json)
                if(title.innerHTML == 'undefined' && activitySelect.value == 'diy'){
                    alert("There's no activities with this amount of participants!")
                    location.reload()
                }
                if(title.innerHTML == 'undefined' && activitySelect.value == 'music'){
                    alert("There's no activities with this amount of participants!")
                    location.reload()
                }
                if(title.innerHTML == 'undefined' && activitySelect.value == 'social'){
                    alert("There's no activities with this amount of participants!")
                    location.reload()
                }
                if(title.innerHTML == 'undefined' && activitySelect.value == 'cooking'){
                    alert("There's no activities with this amount of participants!")
                    location.reload()
                }
                if(title.innerHTML == 'undefined' && activitySelect.value == 'education'){
                    alert("There's no activities with this amount of participants!")
                    location.reload()
                }
            } )
}

const createCard = a => {
    document.querySelector('#title').innerHTML = a.activity
    document.querySelector('#participants').innerHTML = 'Participants: ' + a.participants
    document.querySelector('#acc').innerHTML = 'Activity type: ' + a.type
    document.querySelector('#price').innerHTML = 'Price: ' + a.price
    document.querySelector('#cat').innerHTML = 'Key: ' + a.key
}

document.querySelector('#fetch').addEventListener('click', getActivity)