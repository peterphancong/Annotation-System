//entity model
module.exports = (sequelize, DataTypes) => {
   const Entity = sequelize.define( "entities", {
       text: {
           type: DataTypes.STRING,
           unique: true,
           allowNull: false
       },
       status: {
           type: DataTypes.INTEGER,
           allowNull: false
       }
   }, {timestamps: true}, )
   return Entity
}