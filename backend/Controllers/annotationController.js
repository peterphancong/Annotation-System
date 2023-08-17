const multer  = require('multer')
// var shape = require('shape-json');
var userController = require("./userController");
const db = require("../Models");
const Document = db.documents;
const User = db.users;
const Identifier = db.identifiers;
const https = require("https");
const client_id = '97e4bba0-11b9-4a6b-a79a-201877a4010d_ddc8e35b-30cc-4b32-91ff-c0d8fa5a0730'
const client_secret = 'mf/MkNcvfxITY4/26v5YY/Fao3KEAq5Ba9RG9jFIKMY='
const ICDSearchLimit = 5
const scope = "icdapi_access";
const grant_type = "client_credentials";
let token;
/*-------------------------- Support functions ------------------------------------------*/
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

function getToken() {
  // http header fields to set
  const Authorization = `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString("base64").toString("utf-8")}`;
  const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization
  };

  // http options
  const options = {
      hostname: "icdaccessmanagement.who.int",
      port: 443,
      path: "/connect/token",
      method: "POST",
      headers
  };
  const data = `grant_type=${grant_type}&scope=${scope}`;

  // make request
  return new Promise((resolve, reject) => {
      let req = https.request(options, res => {
          let data = "";

          res.on("data", chunck => {
              data += chunck;
          });
          res.on("end", () => {
              resolve(JSON.parse(data.toString()).access_token);
          });
      });

      req.on("error", error => {
          console.error("ERR", error);
          reject(error);
      });
        
      req.write(data, "utf-8");
      req.end();
  });
};
function get(id) {
  const headers = {
      "Authorization": `Bearer ${token}`, 
      "Accept": "application/json", 
      "Accept-Language": "en",
      "API-Version": "v2"
  };
  const options = {
      hostname: "id.who.int",
      port: 443,
      path: `/icd/entity/${id}`,
      method: "GET",
      headers
  };
  // make request
  return new Promise((resolve, reject) => {
      let req = https.request(options, res => {
          let data = "";
          res.on("data", chunck => {
              data += chunck;
          });
          res.on("end", () => {
              resolve(JSON.parse(data.toString()));
          });
      });
      req.on("error", error => {
          console.error("ERR", error);
          reject(error);
      });
      req.end();
  });
}
async function searchIdentifier(term) {
  let res = await get(encodeURI(`search?q=${term}`));
  let results = res.destinationEntities;
  return results
}

/*-------------------------- Main functions behind APIs ---------------------------------*/
const uploadBiorec = async (req, res) => {
  upload.fields([{name: 'userName'}, {name: 'biorecJsonfile'}]) (req, res, async() => {
    try {
      var filename = req.files["biorecJsonfile"][0]["destination"] + req.files["biorecJsonfile"][0]["filename"];
      const user = await User.findOne({
          where: {
            userName: String(req.body.userName),
          } 
      });
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
const getDocumentByPubmedID = async (req, res) => {
  const {token, pubmedID } = req.body;
  var checkToken = userController.verifyFunc(token)
  if(checkToken) {
    var doc = await Document.findOne({
      attributes: ["documentLink","status"],
      where: {
        pubmedID: pubmedID.toString(),
      }
    });
    filename = doc.documentLink;
    fs.readFile(filename, 'utf8', async (err, data) => {
      if (err) {
        console.log("reading file get error")
        return;
      }
      obj = JSON.parse(data); //parse the content in the file into documments
      doc = obj.documents.filter(element => element.id == pubmedID)[0];
      docData = {
        pubmedID: doc.id,
        title: doc.passages[0].text,
        abstract: doc.passages[1].text
      }; 
      const response = {
        "message": "Get document successfully",
        "document": docData
      }
      res.status(203).send(response);
    });
  }
  else {
    response = {
      "message": "Get document failed",
      "document": null,
    }
    res.status(400).send(response);
  }
}
const addIdentifier = async (req, res) => {
  try {
    const {identifier, identifierType, userName } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName
      } 
    });
    const existedIden = await Identifier.findOne({
      where: {
        identifier: identifier
      } 
    });
    if(user && !existedIden) {
      const identifierData = {
        identifier: identifier,
        identifierType: identifierType,
        status: 1,
        createdBy: user.id,
      };
      await Identifier.create(identifierData);
      const response = {
        "message": "Get identifiers successfully",
        "returnIden": identifier
      }
      return res.status(203).send(response);
    }
    else
    {
      return res.status(400).send("No right to add new identifiers or it is existing");
    }
  }
  catch (error) {
    console.log(error)
    return res.status(401).send("Adding identifier failed");
  }
}
const getIdentifierByType = async (req, res) => {
  const {identifierType, userName } = req.body;
  const user = await User.findOne({
    where: {
      userName: userName
    } 
  });
  if(user) {
    var identifierList = await Identifier.findAll({
      attributes: ["identifier"],
      where:{
        status: 1,
        identifierType: identifierType
      },
      raw: true,
      order: ["identifier"]
    });
    const response = {
      "message": "Get identifiers successfully",
      "identifierList": identifierList.map(function(iden){ return iden.identifier })
    }
    res.status(203).send(response);
  }
  else
  {
    return res.status(400).send("No right to add new identifiers");
  }
}
const searchICD_11 = async (req, res) => {
  try {
    const {searchText } = req.body;
    if (searchText == ''){
      return
    }
        token = await getToken();
    let searchResults = await searchIdentifier(searchText)
    let topSelected = searchResults.slice(0,ICDSearchLimit)
    let responseResult = topSelected.map(({id,title}) => ({ id, title }))
    const response = {
      "message": `Top ${ICDSearchLimit} results found`,
      "returnIden": responseResult
    }
    return res.status(203).send(response);
  }
  catch (error){
    const response = {
      "message": `search fail due to outside request`,
      "returnIden": null
    }
    return res.status(203).send(response);
  }
  
}
module.exports = {
    uploadBiorec,
    loadDocumentList,
    getDocumentByPubmedID,
    addIdentifier,
    getIdentifierByType,
    searchICD_11
};