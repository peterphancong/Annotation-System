const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec, loadDocumentList } = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)
router.post('/loadDocumentList', loadDocumentList)

module.exports = router