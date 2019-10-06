//INICIA O SERVIDOR

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))

constArtistaRoutes = require('./routes/artista')

app.get('/', function (req, res){
    res.send('Api works')
})

app.use('/', ArtistaRoutes)

app.listen(port, function(){
    console.log(`API listen on port ${port}`)
})

module.exports = app