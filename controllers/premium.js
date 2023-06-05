const User = require('../models/users')
const Expense = require('../models/expenses')
const sequelize = require('../util/database')

const getUserLeaderBoard = async(req,res,next) => {
    try{
        const leaderBoardUsers = await User.findAll({
            
            order:[['totalExpenses','DESC']]
    })
        res.status(200).json(leaderBoardUsers)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard,
}