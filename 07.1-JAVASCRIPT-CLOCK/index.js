let sound = new
Audio("./sound/allStar.mp3")

let timer = document.querySelector('#timer')
let minut = document.querySelector('#min')
let sek = document.querySelector('#sek')
let cock = document.querySelector('#secret')
let alarmTime

const saetTid = () => {
    let tid = new Date()

    let nul = ''
    if(tid.getHours() < 10) nul = '0'
    timer.innerHTML = nul + tid.getHours()

    nul = ''
    if(tid.getMinutes() < 10) nul = '0'
    minut.innerHTML = nul + tid.getMinutes()

    nul = ''
    if(tid.getSeconds() < 10) nul = '0'
    sek.innerHTML = nul + tid.getSeconds()
}

setInterval(saetTid, 500)

const secret = () => {
    if(cock.innerHTML == 'clock'){
        cock.innerHTML = 'cock'
    }
    else if(cock.innerHTML == 'cock'){
        cock.innerHTML = 'clock'
    }
}

function hoursMenu(){

	var select = document.getElementById('alarmhrs');
	var hrs = 23

	for (i=1; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}
}
hoursMenu();

function minutesMenu(){

    var select = document.getElementById('alarmmins')
    var mins = 59

    for (i=1; i <= mins; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}

}
minutesMenu()

function secondsMenu(){

    var select = document.getElementById('alarmsecs')
    var secs = 59

    for (i=1; i <= secs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}

}
secondsMenu()

function alarmSet(){
    var hr = document.getElementById('alarmhrs')
    var min = document.getElementById('alarmmins')
    var sec = document.getElementById('alarmsecs')

    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;

    alarmTime = selectedHour + ":" + selectedMin + ":" + selectedSec;
    console.log('alarm: ' + alarmTime);

    document.getElementById('alarmhrs').disabled = true;
	document.getElementById('alarmmins').disabled = true;
	document.getElementById('alarmsecs').disabled = true;

    var h2 = document.getElementById('ur')

    setInterval(function(){
        let tid = new Date()

        let nul = ''
        if(tid.getHours() < 10) nul = '0'
        timer.innerHTML = nul + tid.getHours()

        nul = ''
        if(tid.getMinutes() < 10) nul = '0'
        minut.innerHTML = nul + tid.getMinutes()

        nul = ''
        if(tid.getSeconds() < 10) nul = '0'
        sek.innerHTML = nul + tid.getSeconds()

        var currentTime = h2.innerHTML = timer.innerHTML + ":" + minut.innerHTML + ":" + sek.innerHTML;
	

	    if (alarmTime == currentTime) {
		    sound.play();
		}

        var placeholder = document.getElementById('placeholder')
        placeholder.innerHTML = alarmTime

    },100);

    
}

function alarmClear() {

	document.getElementById('alarmhrs').disabled = false;
	document.getElementById('alarmmins').disabled = false;
	document.getElementById('alarmsecs').disabled = false;
	sound.pause();
    sound.currentTime = 0;
    console.log("Sound and alarm cleared");
}