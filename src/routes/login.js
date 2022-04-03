const controller = require('../controllers/login.js')
const router = require('express').Router()

router.get('/login', controller.GET)
router.post('/login', controller.POST)

module.exports = router