const express = require('express')
const passwordRoutes = require('../controllers/password')

const router = express.Router();

router.use('/forgotpassword', passwordRoutes.forgotPassword)

router.get('/resetpassword/:id', passwordRoutes.resetPassword)

router.get('/updatepassword/:resetpasswordid', passwordRoutes.updatePassword)



module.exports = router