img2 = document.querySelector(".page2-img-container")

const myScrollFunc1 = function() {
    var y = window.scrollY;
    if (y >= 900) {
        img2.style.opacity = "100%"
    }
    else{
        img2.style.opacity = "0%"
    }
}

window.addEventListener("scroll", myScrollFunc1)