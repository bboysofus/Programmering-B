let frontContainer = document.querySelector('#frontContainer')

window.addEventListener('scroll', function() {
  //gør div større på scroll
  var scrollAmount = window.scrollY;
  var borderRadius = Math.max(0, 50 - scrollAmount / 10) + '%';
  var width = Math.min(100, 80 + scrollAmount / 10) + 'vw';
  var height = Math.min(100, 80 + scrollAmount / 10) + 'vh';
  var top = Math.max(0, 10 - scrollAmount / 20) + '%';
  frontContainer.style.borderRadius = borderRadius;
  frontContainer.style.width = width;
  frontContainer.style.height = height;
  frontContainer.style.top = top;
  float()
});

function float(){
  if(window.scrollY == 0){
    frontContainer.style.animation = 'float 3s ease-in-out infinite'
  }
  else{
    frontContainer.style.animation = false
  }
}