const express = require('express')

const ArtistaController = require('./../controllers/artista')

const route = express.Router()

route.get('/artista', ArtistaController.get)

route.get('/artista/:id', ArtistaController.getById)

route.get('/artistas/:page/:column/:order/', ArtistaController.getArtistaPages)

route.post('/artistas', ArtistaController.createArtista)

route.put('/artista/:id', ArtistaController.updateArtista)

route.delete('/artista/:id', ArtistaController.deleteArtista)

module.exports = route