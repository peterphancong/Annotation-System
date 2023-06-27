const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec, loadDocument } = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)
router.post('/loadDocument', loadDocument)

module.exports = router