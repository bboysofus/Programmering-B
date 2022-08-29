//Hent biblioteket ip
const ip = require('ip')
console.log(ip.address())

//Hent bilbioteket express, og gem objektet som en konstant
const express = require('express')

//Opret en variabel til express servere
const app = express()

//Definer en port
const port = 1806

//Vi laver en meget simpel database
const weekDays = {
    "mandag": 'Jeg har det som en hvid mand om mandagen',
    "tirsdag": 'Jeg har det... om tirsdagen',
    "onsdag": 'Jeg har det... om onsdagen',
    "torsdag": 'Jeg har det... om torsdagen',
    "fredag": 'Jeg har det... om fredagen',
    "lørdag": 'Jeg har det... om lørdagen',
    "søndag": 'Jeg har det... om søndagen',
}

//Når der kommer besøg
app.get('/*', (req, res)=>{
    console.log('Serveren fik besøg i roden')
    if(req.params[0]){
        console.log('WOW! Nogen vil bruge vorse API: ' + req.params[0])
        if(weekDays[req.params[0]]){
            res.send(weekDays[req.params[0]])
        }else{
            res.send(req.params[0] + ' is NOT an API endpoint')
        }
    }else{
        res.send('Du besøgte mig da - i min rod')
    }
})

//Start en webserver på porten
app.listen(1806, ()=>{
    console.log('Webserver kører')
})

