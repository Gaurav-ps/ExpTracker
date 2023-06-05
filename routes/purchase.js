const express = require('express')
const userAuthenticate = require('../middleware/auth')
const purchaseController = require('../controllers/purchase')

const router = express.Router()

router.get('/premiummembership', userAuthenticate.authenticate, purchaseController.purchasepremium)

router.post('/updatetransactionstatus', userAuthenticate.authenticate, purchaseController.updateTransactionStatus)

module.exports = router