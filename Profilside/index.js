let frontContainer = document.querySelector('#frontContainer')
let omMig = document.querySelector('#omMig')
let projekter = document.querySelector('#projekter')
let button = document.querySelector(".button-to-top");


window.addEventListener('scroll', function() {
  //gør div større på scroll
  var scrollAmount = window.scrollY;
  var borderRadius = Math.max(0, 50 - scrollAmount / 15) + '%';
  var width = Math.min(120, 50 + scrollAmount / 10) + 'rem';
  var height = Math.min(120, 50 + scrollAmount / 10) + 'rem';
  frontContainer.style.borderRadius = borderRadius;
  frontContainer.style.width = width;
  frontContainer.style.height = height;
  //Fjern de to diver i siderne
  vanish()
  //Vis knappen til at springe til toppen
  buttonUp()
});


//Funktion til at fjerne de to diver i siderne, når der scrolles
function vanish(){
  //Hvis der ikke er blevet scrollet på siden
  if(window.scrollY == 0){
    omMig.style.opacity = 1
    omMig.style.position = 'relative'
    omMig.style.visibility = 'visible'
    projekter.style.opacity = 1
    projekter.style.position = 'relative'
    projekter.style.visibility = 'visible'
    document.querySelector('#front').style.gridAutoFlow = 'column'
  }
  //Hvis der er blevet scrollet på siden
  else{
    omMig.style.opacity = 0
    omMig.style.position = 'absolute'
    omMig.style.visibility = 'hidden'
    projekter.style.opacity = 0
    projekter.style.position = 'aboslute'
    projekter.style.visibility = 'hidden'
    document.querySelector('#front').style.gridAutoFlow = 'unset'
  }
}

//Funktion til at springe direkte til 'Om mig'
function jumpToOmMig(){
  window.scrollTo({
    top: 1600,
    behavior: "smooth"
  })
}

//Funktion til at springe direkte til 'Projekter'
function jumpToProjekter(){
  window.scrollTo({
    top: 2200,
    behavior: "smooth"
  })
}

//Funktion til at vise knap til at komme tilbage til toppen efter scroll på 200 på y
function buttonUp(){
  var y = window.scrollY;
  if (y >= 200) {
    button.style.opacity = "100%"
    button.style.cursor = "pointer"
  } else {
    button.style.opacity = "0%"
    button.style.cursor = "default"
  }
};


//Funktion til at springe direkte til toppen
function toTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}