const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec, loadDocumentList, getAnnotationDetail } = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)
router.post('/loadDocumentList', loadDocumentList)
router.post('/getAnnotationDetail', getAnnotationDetail)
module.exports = router