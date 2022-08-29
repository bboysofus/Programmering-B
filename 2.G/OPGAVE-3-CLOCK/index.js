let timer = document.querySelector('#timer')
let min = document.querySelector('#min')
let sek = document.querySelector('#sek')
let clickMe = document.getElementById("clickMe")
let allchar = "0123456789ABCDEF"


const saetTid = () => {
    let tid = new Date()

    let nul = ''
    if(tid.getHours() < 10) nul ='0'
    timer.innerHTML = nul + tid.getHours()

    nul = ''
    if(tid.getMinutes() < 10) nul ='0'
    min.innerHTML = nul + tid.getMinutes()

    nul = ''
    if(tid.getSeconds() < 10) nul ='0'
    sek.innerHTML = nul + tid.getSeconds()
}
setInterval(saetTid, 1000)

dragElement(document.getElementById("ur"))

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "ur")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "ur").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

    function skiftFarve(){
      let randcol = ""
      for(let i=0; i<6; i++){
        randcol += allchar[Math.floor(Math.random()*16)]
      }
      document.getElementById("ur").style.color = "#"+randcol
      document.getElementById("ur").style.borderColor = "#"+randcol
  }