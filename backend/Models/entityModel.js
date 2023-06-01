//entity model
module.exports = (sequelize, DataTypes) => {
   const Entity = sequelize.define( "entities", {
       text: {
           type: DataTypes.STRING,
           unique: true,
           allowNull: false
       },
    //    src:{
    //     type: DataType

    //    },

       active: {
           type: DataTypes.BOOLEAN,
           allowNull: false
       }
   }, {timestamps: true}, )
   return Entity
}