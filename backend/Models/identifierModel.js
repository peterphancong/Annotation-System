//Identifier model
module.exports = (sequelize, DataTypes) => {
    const Identifier = sequelize.define( "identifiers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        identifier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        identifierType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER
        }
    }, {timestamps: true}, )
    return Identifier
 }