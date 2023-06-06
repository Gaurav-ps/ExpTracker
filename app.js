const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database')

const User = require('./models/users')
const Expense = require('./models/expenses')
const Order = require('./models/orders')
const Forgotpassword = require('./models/forgotpassword')
const helmet = require('helmet')
const morgan = require('morgan')

const premiumRoutes = require('./routes/premium')
const passwordRoutes = require('./routes/password')
const expenseRoutes = require('./routes/expense')
const orderRoutes = require('./routes/orders')
const userRoutes = require('./routes/users')
const purchaseRoutes = require('./routes/purchase')


var cors = require('cors')

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{
    flags: 'a'
})

app.use(helmet())
app.use(morgan('combined', {stream: accessLogStream }))



app.use(cors())

app.use(bodyParser.json({extended: false}))

app.use('/expense',expenseRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',passwordRoutes)
app.use(orderRoutes)

app.use('/users',userRoutes)

app.use((req,res) => {
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()
.then(()=> {
    app.listen(process.env.PORT || 4000)
})
.catch(err => {
    console.log(err)
})

