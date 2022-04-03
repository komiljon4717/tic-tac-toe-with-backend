const controller = require('../controllers/home.js')
const router = require('express').Router()

router.get('/', controller.GET)

module.exports = router