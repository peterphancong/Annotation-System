const multer  = require('multer')
const jwt = require("jsonwebtoken");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.userName + '_' + Date.now().toString() + '_' + file.originalname);
        // trace back the posted time by using Date(Date.now().toString()) to take out the real date.
    }
});

const upload = multer({ storage: storage });
const uploadBiorec = (req, res) => {
    upload.fields([{name: 'userName'}, {name: 'files'}])(req, res, () => {
        try {
            var token = req.body.token
            var files = req.files
            // const myFile = req.files[0];
            // //  mv() method places the file inside public directory
            // myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
            //     if (err) {
            //         console.log(err)
            //         return res.status(500).send({ msg: "Error occured"});
            //     }
            //     // returing the response with file path and name
            //     return res.send({name: myFile.name, path: `/${myFile.name}`});
            // });
        }
        catch (error) {
            console.log(error);
        }
    })
    
};

module.exports = {
    uploadBiorec
};