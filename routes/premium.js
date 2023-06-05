const express = require('express')
const userAuthenticate = require('../middleware/auth')
const premiumController = require('../controllers/premium')

const router = express.Router();

router.get('/showLeaderBoard',userAuthenticate.authenticate, premiumController.getUserLeaderBoard)

module.exports = router