console.log("Hej")

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/itadmin/*', (req, res) => {
    res.send('Hej Martin, husk at smile')
  })

app.listen(port, ()=>{
    console.log('Express server is now running on port: ' + port)
})



