img2 = document.querySelector(".page2-img-container")
text1 = document.querySelector(".page2-text-container")
ast1 = document.querySelector("#ast1")
ast2 = document.querySelector("#ast2")

const myScrollFunc1 = function() {
    var y = window.scrollY;
    if (y >= 700 && y <= 1500) {
        img2.style.opacity = "100%";
    }
    else if (y > 1500) {
        img2.style.opacity = "0%";
    }
    else{
        img2.style.opacity = "0%"
    }
}

const appear = function(){
    text1.style.opacity = "100%"
}

const myScrollFunc2 = function() {
    var y = window.scrollY;
    if (y >= 700 && y <= 1500) {
        setTimeout(appear, 1000)
    }
    else if (y > 1500) {
        text1.style.opacity = "0%"
    }
    else{
        text1.style.opacity = "0%"
    }
}

const back1 = function(){
    ast1.style.animation = "float 5s ease-in-out infinite"
}

const anim1 = function(){
    ast1.style.animation = "wow1 5s ease-in-out"
    setTimeout(back1, 5000)
}

const back2 = function(){
    ast2.style.animation = "float 5s ease-in-out infinite"
}

const anim2 = function(){
    ast2.style.animation = "wow2 5s ease-in-out"
    setTimeout(back2, 5000)
}

window.addEventListener("scroll", myScrollFunc1)
window.addEventListener("scroll", myScrollFunc2)