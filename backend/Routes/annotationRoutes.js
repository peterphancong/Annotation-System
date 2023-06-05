const express = require('express')
const annotationController = require('../Controllers/annotationController')
const { uploadBiorec } = annotationController

const router = express.Router()
router.post('/uploadBiorec', uploadBiorec)

module.exports = router