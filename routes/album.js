const express = require('express')

const AlbumController = require('./../controllers/album')

const route = express.Router()

route.get('/albums', AlbumController.get)

route.get('/album/:id', AlbumController.getById)

route.get('/album/:page/:column/:order', AlbumController.getAlbumsPages)

route.post('/albums', AlbumController.createAlbum)

route.put('/album/:id', AlbumController.updateAlbum)

route.delete('/album/:id', AlbumController.deleteAlbum)

module.exports = route