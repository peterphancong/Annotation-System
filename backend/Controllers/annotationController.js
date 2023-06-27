const multer  = require('multer')
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../Models");
const Document = db.documents;
const User = db.users;
// const Document = require('../models/documentModel.js')(sequelize, DataTypes);
// const User = require('../models/userModel.js')(sequelize, DataTypes);
const loadListByPage = (userID, pageSize, pageIndex) =>{
  var documentlist = Document.findAndCountAll({
    attributes: ["title","pubmedID","status"],
    where:{
      uploadedBy: userID,
    },
    order: ['createdAt'],
    limit: pageSize,
    offset: pageIndex
  });
  return documentlist;
}
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
      const user = await User.findOne({
          where: {
            userName: String(req.body.userName),
          } 
      });
      console.log(String(req.body.userName))
      fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
          console.log("reading file get error")
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
            uploadedBy: user.id
          };
          createdDocument = Document.create(docData);
        });
      });
      docList = await loadListByPage(user.id, 10,0);
      const response = {
        "message": "Uploaded successfully",
        "documentlist": docList,
      }
      return res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
    }
  })
};

const loadDocumentList = async (req, res) => {
  try {
    const { userName, pageSize, pageIndex } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName
      } 
    });
    var loadedByID
    if (user.role == 2){
      loadedByID = user.createdBy
    }
    else {
      loadedByID = user.id
    }
    docList = await loadListByPage(loadedByID, pageSize, pageIndex);

    const response = {
      "message": `page ${pageIndex} loaded sucessfully`,
      "documentlist": docList
    }
    return res.status(203).send(response);
  }
  catch (error) {
    console.log(error);
    return res.status(503).send('Load paging data failed');
  }
}
module.exports = {
    uploadBiorec,
    loadDocumentList
};