//Identifier model
module.exports = (sequelize, DataTypes) => {
    const Identifier = sequelize.define( "identifiers", {
        identifier: {
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