//Hent biblioteket ip
const ip = require('ip')
console.log(ip.address())

//Hent bilbioteket express, og gem objektet som en konstant
const express = require('express')

//Opret en variabel til express servere
const app = express()

//Definer en port
const port = 1806

//Serve en statisk mappe i roden
app.use('/', express.static('public'))

//Når der kommer besøg på endpointet hvaler
app.get('/api/hvaler', (req, res)=>{
    const obj = {
        'Blåhval':{
            'farve': 'grøn',
            'Vægt': '5 ton'
        }
    }
    res.json(obj)
    res.send('Du er kommet til mit hval-api')
})

app.get('/api/dato', (req, res)=>{
    const obj = {
        'Onsdag 31/08/2022':{
            'Vejr': 'Solrigt'
        }
    }
    res.json(obj)
    res.send('Du er kommet til mit dato-api')
})

//Start en webserver på porten
app.listen(1806, ()=>{
    console.log('Webserver kører')
})
