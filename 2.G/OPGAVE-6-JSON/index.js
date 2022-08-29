span = document.querySelector(".img-p-arrow-container");
button = document.querySelector(".button-to-top");

const myScrollFunc1 = function() {
  var y = window.scrollY;
  if (y >= 100) {
    span.style.opacity = "0%"
  } else {
    span.style.opacity = "100%"
  }
};

const myScrollFunc2 = function() {
  var y = window.scrollY;
  if (y >= 800) {
    button.style.opacity = "100%"
    button.style.cursor = "pointer"
  } else {
    button.style.opacity = "0%"
    button.style.cursor = "default"
  }
};

window.addEventListener("scroll", myScrollFunc1);
window.addEventListener("scroll", myScrollFunc2);

function toTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

let rap = [{
  name: 'ASTROWORLD',
  artist: 'Travis Scott',
  releaseDate: '<span class="hey">Release:</span> August 3rd 2018',
  duration: '59 minutes'
}, {
  name: 'Unlocked',
  artist: 'Denzel Curry',
  releaseDate: '<span class="hey">Release:</span> February 7th 2020',
  duration: '18 minutes'
}, {
  name: 'Illmatic',
  artist: 'Nas',
  releaseDate: '<span class="hey">Release:</span> April 19th 1994',
  duration: '74 minutes'
}, {
  name: 'DAMN.',
  artist: 'Kendrick Lamar',
  releaseDate: '<span class="hey">Release:</span> April 14th 2017',
  duration: '55 minutes'
}, {
  name: 'IGOR',
  artist: 'Tyler, The Creator',
  releaseDate: '<span class="hey">Release:</span> May 19th 2019',
  duration: '40 minutes'}]

let jazz = [{
  name: 'Kind of Blue',
  artist: 'Miles Davis',
  releaseDate: '<span class="hey">Release:</span> August 17th 1959',
  duration: '45 minutes'
}, {
  name: 'Somethin Else',
  artist: 'Canonball Adderly',
  releaseDate: '<span class="hey">Release:</span> January 1st 1958',
  duration: '39 minutes'
}, {
  name: 'Head Hunters',
  artist: 'Herbie Hancock',
  releaseDate: '<span class="hey">Release:</span> October 13th 1973',
  duration: '42 minutes'
}, {
  name: 'Night Train',
  artist: 'Oscar Peterson',
  releaseDate: '<span class="hey">Release:</span> January 1st 1963',
  duration: '45 minutes'
}, {
  name: 'Bright Size Life',
  artist: 'Pat Metheny',
  releaseDate: '<span class="hey">Release:</span> January 3rd 1976',
  duration: '37 minutes'
}]

rap.map(album => {
  let newAlbumRap = document.createElement('div')
  newAlbumRap.classList.add('album-rap')
  newAlbumRap.innerHTML = album.name + '<br>' + album.artist + '<br>' + album.releaseDate + '<br>' + album.duration

  document.querySelector('.album-rap-container').append(newAlbumRap)
})

jazz.map(album => {
  let newAlbumJazz = document.createElement('div')
  newAlbumJazz.classList.add('album-jazz')
  newAlbumJazz.innerHTML = album.name + '<br>' + album.artist + '<br>' + album.releaseDate + '<br>' + album.duration

  document.querySelector('.album-jazz-container').append(newAlbumJazz)
})