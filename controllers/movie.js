const {MovieModel} = require('./../models')

class Movie {
    get(req, res) {

        MovieModel.findAll({raw: true})

            .then((result) => res.status(200).json(result))

            .catch((error) => res.status(500).json(error))

    }

    getById(req, res) {

        MovieModel.findByPk(req.params.id)

            .then((result) => res.status(200).json(result))

            .catch((error) => res.status(500).json(error))
    }

    getMoviesPages(req, res){
        let limit = 4
        let offset = 0

        let column = req.params.column
        let order = req.params.order

        let datestart = req.query.date || 'IS NOT NULL' 

        let genre = req.query.genre || 'IS NOT NULL'

        let search = req.query.search || 'IS NOT NULL'

        sequelize.query(
            `SELECT
                CONT(*) AS ITEMS
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
                    A.ID
                    A.NAME
                    A.COUNTRY
                    A.DATASTART
                FROM ARTISTS AS A
                WHERE GENRE ${genre} AND DATESTART ${datestart} AND NAME ${search}
                ORDER BY ${column} ${order}
                LIMIT ${limit}
                OFFSET ${offset}`
            )
            .then((movies) => res.json({ result: movies[0], count: items, pages: pages }).status(200))
            .catch((error) => res.json(error).status(500))
        })
        .catch((error) => res.json(error).status(500))

    }

    createMovie(req, res){
        MovieModel.create(req.body)
            .then((movieCreated) => {
                console.log(`[200] - Insert into movies successful [ ${rew.body.NAME} ]`)
                res.json({message: 'O artista foi criado com sucesso', value: movieCreated}).status(201)
            })
            .catch((error) => res.json({message: 'Erro ao criar um artista no banco de dados', error: error}).status(500))
    }

    updateMovie(req, res){
        MovieModel.update(req.body, {
            where: {
                ID: req.params.id
            }
        })
        .then((movieUpdated) => res.json({message: 'O artista foi atualizado com sucesso', value: movieUpdated}).status(200))
        .catch((error) => res.json({message: 'Erro ao atualizar os dados do artista', error: error}).status(500))
    }

    deleteMovie(req, res){
        MovieModel.destroy({
            where: {
                ID: req.params.id
            }
        })
        .then((deletedMovie) => res.json({message: 'O artista foi excluído com sucesso', value: deletedMovie}).status(200))
        .catch((error) => res.json({message: 'Erro ao excluir dados do artista', error: error}).status(500))
    }
}

module.exports = new Movie()