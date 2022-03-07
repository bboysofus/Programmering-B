img2 = document.querySelector(".page2-img-container")
text1 = document.querySelector(".page2-text-container")

const myScrollFunc1 = function() {
    var y = window.scrollY;
    if (y >= 700 && y <= 1500) {
        img2.style.opacity = "100%";
        text1.style.opacity = "100%";
    }
    else if (y > 1500) {
        img2.style.opacity = "0%";
        text1.style.opacity = "0%"
    }
    else{
        img2.style.opacity = "0%"
        text1.style.opacity = "0%"
    }
}

window.addEventListener("scroll", myScrollFunc1)