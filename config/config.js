const Sequelize = require('sequelize')

const sequelize = new Sequelize('gpesnode', 'gpes2019', 'gpes2019',{
    host: "mysql669.umbler.com",
    port: '41890',
    dialect: 'mysql'
})

module.exports = sequelize