module.exports = (sequelize, DataTypes) => {

    const AlbumModel = sequelize.define('AlbumModel', {
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
            max: 300,
            allowNull: false
        },
        RELEASEDATE: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        NUMBERTRACKS: {
            type: DataTypes.INTEGER,
            required: true,
            max: 11,
            allowNull: false
        },
        RECORDCOMPANY: {
            type: DataTypes.STRING,
            required: true,
            max: 200,
            allowNull: false
        }
    },
        {
            tableName: 'ALBUMS',
            timestamps: false
        }
    )

        return AlbumModel

}