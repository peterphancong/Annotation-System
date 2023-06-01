//Identifier model
module.exports = (sequelize, DataTypes) => {
    const Identifier = sequelize.define( "identifiers", {
        identifier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entity_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false}, )
    return Identifier
 }