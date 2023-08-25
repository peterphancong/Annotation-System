const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec, loadDocumentList, getDocumentByPubmedID , addIdentifier, getIdentifierByType, searchICD_11, saveAnnotation, loadEntitiesRelation} = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)
router.post('/loadDocumentList', loadDocumentList)
router.post('/getDocumentByPubmedID', getDocumentByPubmedID)
router.post('/addIdentifier', addIdentifier)
router.post('/getIdentifierByType', getIdentifierByType)
router.post('/searchICD_11', searchICD_11)
router.post('/saveAnnotation', saveAnnotation)
router.post('/loadEntitiesRelation', loadEntitiesRelation)

module.exports = router