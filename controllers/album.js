const {AlbumModel} = require('./../models')
const sequelize = require('./../config/config')

class Album {
    get(req, res) {

        AlbumModel.findAll({raw: true})

            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(500).json(error))
    }

    getById(req, res) {

        AlbumModel.findByPk(req.params.id)
            
            .then((result) => res.status(200).json(result))
            .catch((error) => res.result(500).json(error))
    }

    getAlbumsPages(req, res) {
        let limit = 4
        let offset = 0

        let column = req.params.column
        let order = req.params.order

        let releasedate = req.query.date || 'IS NOT NULL'

        let search = req.query.search || 'IS NOT NULL'

        sequelize.query(
            `SELECT
                COUNT(*) AS ITEMS
            FROM ALBUMS
            WHERE RELEASEDATE ${releasedate} AND NAME ${search}`
        )
        .then((data) => {
            const items = data[0][0].items
            let page = req.params.page
            let pages = Math.ceil(items/limit)
            offset = limit*(page-1)
            sequelize.query(
                `SELECT
                    AL.ID,
                    AL.NAME,
                    AL.RELEASEDATE,
                    AL.NUMBERTRACKS,
                    AL.RECORDCOMPANY
                FROM ALBUMS AS AL
                WHERE RELEASEDATE ${releasedate} AND NAME ${search}
                ORDER BY ${column} ${order}
                LIMIT ${limit}
                OFFSET ${offset}`
            )
            .then((albums) => res.json({result: albums[0], count: items, page: pages}).status(200))
            .catch((error) => res.json(error).status(500))
        })
        .catch((error) => res.json(error).status(500))
    }

    createAlbum(req, res) {
        AlbumModel.create(req.body)
            .then((albumCreated) => {
                console.log(`[200] - Insert into albums successful [${req.body.NAME}]`)
                res.json({message: 'O álbum foi criado com sucesso', value: albumCreated}).status(200)
            })
            .catch((error) => res.json({message: 'Erro ao criar um novo álbum', error: error}).status(500))
    }

    updateAlbum(req, res) {

        AlbumModel.update(req.body, {
            where: {
                ID: req.params.id
            }
        })
        .then((albumUpdated) => res.json({message: 'O álbum foi atualizado com sucesso', value: albumUpdated}).status(200))
        .catch((error) => res.json({message: 'Erro ao atualizar o álbum', error: error}).status(500))
    }

    deleteAlbum(req, res) {
        AlbumModel.destroy ({
            where: {
                ID: req.params.id
            }
        })
        .then((deletedAlbum) => res.json({message: 'O álbum foi deletado com sucesso', value: deletedAlbum}).status(200))
        .catch((error) => res.json({message: 'Erro ao deletar álbum', error: error}).status(500))
    }
    
}

module.exports = new Album()