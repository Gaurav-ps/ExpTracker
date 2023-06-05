const express = require('express')

const expenseRoutes = require('../controllers/expense')
const userAuthenticate = require('../middleware/auth')

const router = express.Router();

router.post('/add-expenses', userAuthenticate.authenticate, expenseRoutes.addExpense)

router.get('/get-expenses', userAuthenticate.authenticate ,expenseRoutes.getExpense)

router.get('/download', userAuthenticate.authenticate, expenseRoutes.downloadExpenses)

router.delete('/delete-expenses/:id',userAuthenticate.authenticate,expenseRoutes.deleteExpense)

module.exports = router;