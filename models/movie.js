module.exports = (sequelize, DataTypes) => {

    const MovieModel = sequelize.define('MovieModel', {

        ID: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NAME: {
            type: DataTypes.STRING,
            required: true,
            max: 200,
            allowNull: false
        },
        COUNTRY: {
            type: DataTypes.STRING,
            required: true,
            max: 70,
            allowNull: false
        },
        GENRE: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        DATESTART: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        }

    },

        {
            tableName: 'ARTISTS',
            timestamps: false
        }
    )

        return MovieModel
}