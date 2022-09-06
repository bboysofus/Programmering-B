console.log('vi er her')
let hvaler = document.getElementById('hvaler')
hvaler.style.top = '90vh'
let submitH = document.getElementById('submitH')

let dato = document.getElementById('dato')
dato.style.top = '80vh'
let submitD = document.getElementById('submitD')

document.querySelector('#hvaler h2').addEventListener('click', ()=>{
    if(hvaler.style.top == '90vh'){
        hvaler.style.top = 0;
    }
    else{
        hvaler.style.top = '90vh'
    }
})

document.querySelector('#dato h2').addEventListener('click', ()=>{
    if(dato.style.top == '80vh'){
        dato.style.top = 0;
    }
    else{
        dato.style.top = '80vh'
    }
})

submitH.addEventListener('click', ()=>{
    fetch('http://localhost:1806/api/hvaler')
        .then(res => res.json())
            .then(json => document.querySelector('#hvaler .json').innerHTML = JSON.stringify(json))
})

submitD.addEventListener('click', ()=>{
    fetch('http://localhost:1806/api/dato')
        .then(res => res.json())
            .then(json => document.querySelector('#dato .json').innerHTML = JSON.stringify(json))
})



