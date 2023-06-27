const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./userModel.js")(sequelize, Sequelize);
db.documents = require("./documentModel.js")(sequelize, Sequelize);
db.entities = require("./entityModel.js")(sequelize, Sequelize);
db.identifiers = require("./identifierModel.js")(sequelize, Sequelize);

/////////////// OR-Mapping place
//Document has many entities, entity belong to a document
db.documents.hasMany(db.entities);
db.entities.belongsTo(db.documents);

// User - Document relationship
db.users.hasMany(db.documents, {foreignKey:'uploadedBy'});
db.documents.belongsTo(db.users,{foreignKey:'uploadedBy'});

// User - User relationship
db.users.hasMany(db.users, {foreignKey:'createdBy'});
db.users.belongsTo(db.users,{foreignKey:'createdBy'});

db.users.hasMany(db.identifiers);
db.identifiers.belongsTo(db.users);

db.identifiers.hasMany(db.entities);
db.entities.belongsTo(db.identifiers);

module.exports = db;