const multer  = require('multer')
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../Models");
const Document = db.documents;
const User = db.users;
// const Document = require('../models/documentModel.js')(sequelize, DataTypes);
// const User = require('../models/userModel.js')(sequelize, DataTypes);

var storage = multer.diskStorage({
    destination: function (req, biorecJsonfile, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, biorecJsonfile, callback) {
        callback(null, req.body.userName + '_' + Date.now().toString() + '_' + biorecJsonfile.originalname);
        // trace back the posted time by using Date(Date.now().toString()) to take out the real date.
    }
});
const fs = require('fs');
const upload = multer({ storage: storage });
const uploadBiorec = async (req, res) => {
  upload.fields([{name: 'userName'}, {name: 'biorecJsonfile'}]) (req, res, async() => {
    try {
      var filename = req.files["biorecJsonfile"][0]["destination"] + req.files["biorecJsonfile"][0]["filename"];
      console.log(filename)
      const user = await User.findOne({
          where: {
            userName: String(req.body.userName),
          } 
        });
      fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        obj = JSON.parse(data); //parse the content in the file into documments
        obj.documents.forEach(async element => {
          const docData = {
            pubmedID: element.id,
            title:element.passages[0].text,
            documentLink: filename,
            status: 0,
            active: true,
            userId: user.id
          };
          createdDocument = Document.create(docData);
        });
      });
      
    }
    catch (error) {
        console.log(error);
    }
  })
};

module.exports = {
    uploadBiorec
};