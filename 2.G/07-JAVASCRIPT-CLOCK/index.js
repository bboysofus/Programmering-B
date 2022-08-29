let timer = document.querySelector('#timer')
let min = document.querySelector('#min')
let sek = document.querySelector('#sek')
let thomas = document.querySelector('#thomas')


const saetTid = () => {
    let nul = ''
    let tid = new Date()
    
    if(thomas.style.backgroundImage == 'url("./assets/ked.png")'){
        thomas.style.backgroundImage = 'url("./assets/glad.png")'
    }else{
        thomas.style.backgroundImage = 'url("./assets/ked.png")'
    }
    
    thomas.style.marginLeft = 1.6 * tid.getSeconds() + '%'

    nul = ''
    if(tid.getHours() < 10) nul = '0'
    timer.innerHTML = nul + tid.getHours()
    nul = ''
    if(tid.getMinutes() < 10) nul = '0'
    min.innerHTML = nul + tid.getMinutes()
    nul = ''
    if(tid.getSeconds() < 10) nul = '0'
    sek.innerHTML = nul + tid.getSeconds()
}

setInterval(saetTid, 1000)