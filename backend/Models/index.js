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
db.relations = require("./relationModel.js")(sequelize, Sequelize);

// --------------------------- OR-Mapping place ------------------------------------
// Document has many entities, entity belong to a document
db.documents.hasMany(db.entities, {foreignKey:'documentID'});
db.entities.belongsTo(db.documents, {foreignKey:'documentID'});

// User - Document relationship
db.users.hasMany(db.documents, {foreignKey:'uploadedBy'});
db.documents.belongsTo(db.users,{foreignKey:'uploadedBy'});

// User - User relationship
db.users.hasMany(db.users, {foreignKey:'createdBy'});
db.users.belongsTo(db.users,{foreignKey:'createdBy'});

// User - Identifier relationship
db.users.hasMany(db.identifiers, {foreignKey:'createdBy'});
db.identifiers.belongsTo(db.users, {foreignKey:'createdBy'});

// Identifier - Entity relationship
db.identifiers.hasMany(db.entities, {foreignKey:'identifiedBy'});
db.entities.belongsTo(db.identifiers, {foreignKey:'identifiedBy'});

// User - Entity relationship
db.users.hasMany(db.entities, {foreignKey:'annotatedBy'});
db.entities.belongsTo(db.users, {foreignKey:'annotatedBy'});

// Relation - User relationship
db.users.hasMany(db.relations, {foreignKey:'annotatedBy'});
db.relations.belongsTo(db.users, {foreignKey:'annotatedBy'});

// Relation - Document
db.documents.hasMany(db.relations, {foreignKey:'documentID'});
db.relations.belongsTo(db.documents, {foreignKey:'documentID'});

module.exports = db;