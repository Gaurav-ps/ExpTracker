const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function stringValidate(string){
    if(string === undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

const addUsers = async(req,res,next) => {
    try{
        const name = req.body.Name
        const email = req.body.Email
        const password = req.body.Password 
        if(stringValidate(name) || stringValidate(email) || stringValidate(password)){
            return res.status(400).json({err: 'Bad Parameters'})
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds,async(err,hash)=>{
            await User.create({name:name, email:email, password:hash})
            res.status(201).json({message: 'User created successfully'})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

function generateAccessToken(id, ispremiumuser){
    return jwt.sign({userId: id, ispremiumuser},'secretkey')
}

const loginUsers = async(req,res,next) => {
    try{
        const email = req.body.Email
        const password = req.body.Password
        if(stringValidate(email) || stringValidate(password)){
            return res.status(400).json({message: 'Bad parameters',success:false})
        }
        const allUsers = await User.findAll({where: {email}})
        if(allUsers.length > 0){
            bcrypt.compare(password,allUsers[0].password,(err,result) => {
                if(err){
                    throw new Error('Error')
                }
                if(result == true){
                   return res.status(200).json({success: true, message:'Login successful', token: generateAccessToken(allUsers[0].id, allUsers[0].ispremiumuser)})
                }
                else{
                    return res.status(400).json({success: false, message:'Incorrect password'})
                }
            })
        }
        else{
            return res.status(404).json({success: false, message:'User not found'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: err, success:false
        })
    }
}

module.exports = {
    addUsers,
    loginUsers,
    generateAccessToken,
}