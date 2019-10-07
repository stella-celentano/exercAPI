const {ArtistaModel} = require('./../models')
const sequelize = require('./../config/config')

class Artista {
    get(req, res) {

        ArtistaModel.findAll({raw: true})

            .then((result) => res.status(200).json(result))

            .catch((error) => res.status(500).json(error))

    }

    getById(req, res) {

        ArtistaModel.findByPk(req.params.id)

            .then((result) => res.status(200).json(result))

            .catch((error) => res.status(500).json(error))
    }

    getArtistaPages(req, res){
        let limit = 4
        let offset = 0

        let column = req.params.column
        let order = req.params.order

        let datestart = req.query.date || 'IS NOT NULL' 

        let genre = req.query.genre || 'IS NOT NULL'

        let search = req.query.search || 'IS NOT NULL'

        sequelize.query(
            `SELECT
                COUNT(*) AS ITEMS
            FROM ARTISTS
            WHERE GENRE ${genre} AND DATESTART ${datestart} AND NAME ${search}`
            
        )
        .then((data) => {
            const items = data[0][0].ITEMS
            let page = req.params.page
            let pages = Math.ceil(items / limit)
            offset = limit *  (page - 1)
            sequelize.query(
                `SELECT
                    A.ID,
                    A.NAME,
                    A.COUNTRY,
                    A.DATESTART
                FROM ARTISTS AS A
                WHERE GENRE ${genre} AND DATESTART ${datestart} AND NAME ${search}
                ORDER BY ${column} ${order}
                LIMIT ${limit}
                OFFSET ${offset}`
            )
            .then((artistas) => res.json({ result: artistas[0], count: items, page: pages }).status(200))
            .catch((error) => res.json(error).status(500))
        })
        .catch((error) => res.json(error).status(500))

    }

    createArtista(req, res){
        ArtistaModel.create(req.body)
            .then((artistaCreated) => {
                console.log(`[200] - Insert into movies successful [ ${req.body.NAME} ]`)
                res.json({message: 'O artista foi criado com sucesso', value: artistaCreated}).status(201)
            })
            .catch((error) => res.json({message: 'Erro ao criar um artista no banco de dados', error: error}).status(500))
    }

    updateArtista(req, res){
        ArtistaModel.update(req.body, {
            where: {
                ID: req.params.id
            }
        })
        .then((artistaUpdated) => res.json({message: 'O artista foi atualizado com sucesso', value: artistaUpdated}).status(200))
        .catch((error) => res.json({message: 'Erro ao atualizar os dados do artista', error: error}).status(500))
    }

    deleteArtista(req, res){
        ArtistaModel.destroy({
            where: {
                ID: req.params.id
            }
        })
        .then((deletedArtista) => res.json({message: 'O artista foi excluído com sucesso', value: deletedArtista}).status(200))
        .catch((error) => res.json({message: 'Erro ao excluir dados do artista', error: error}).status(500))
    }
}

module.exports = new Artista()