const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authenticate = async(req,res,next) => {

    try{
        const token = req.header('Authorization')
        console.log(token)
        const user = jwt.verify(token, 'secretkey')
        console.log(user.userId)
        let response = await User.findByPk(user.userId)
        //console.log(response)
        req.user = response;
        next()
    }
    catch(err){
        console.log(err)
        return res.status(400).json({success: false})
    }

}
module.exports = {
    authenticate
}