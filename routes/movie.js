const express = require('express')

const MovieController = require('./../controllers/movie')

const route = express.Router()

route.get('/movies', MovieController.get)

route.get('/movie/:id', MovieController.getById)

route.get('/movies/:page/:column/:order/', MovieController.getMoviesPages)

route.post('/movies', MovieController.createMovie)

route.put('/movie/:id', MovieController.updateMovie)

route.delete('/movie/:id', MovieController.deleteMovie)

module.exports = route