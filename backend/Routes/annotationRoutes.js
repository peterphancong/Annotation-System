const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec, loadDocumentList, getDocumentByPubmedID , addIdentifier, getIdentifierByType} = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)
router.post('/loadDocumentList', loadDocumentList)
router.post('/getDocumentByPubmedID', getDocumentByPubmedID)
router.post('/addIdentifier', addIdentifier)
router.post('/getIdentifierByType', getIdentifierByType)
module.exports = router