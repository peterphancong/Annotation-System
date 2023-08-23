//Relation model
module.exports = (sequelize, DataTypes) => {
  const Relation = sequelize.define( "relations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false
    }
   }, {timestamps: true}, )
   return Relation
}