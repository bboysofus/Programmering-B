let main = document.querySelector('main')
let button = document.querySelector('#button')

const skiftBillede = () => {
    main.style.backgroundImage = 'url("./assets/1.jpg")'
}

button.addEventListener('click', skiftBillede)