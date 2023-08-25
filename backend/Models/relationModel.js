//Relation model
module.exports = (sequelize, DataTypes) => {
  const Relation = sequelize.define( "relations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID1_Identifier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID1_Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID2_Identifier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID2_Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RelType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
   }, {timestamps: true}, )
   return Relation
}