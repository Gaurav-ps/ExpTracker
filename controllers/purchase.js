const Razorpay = require('razorpay')
const Order = require('../models/orders')
const userController = require('./users')

const purchasepremium = async(req,res,next) => {
    try{
        var rzp = new Razorpay({
            key_id: //'rzp_test_lPOwutuSaZeOgS',
                    process.env.RAZORPAY_KEY_ID,
            key_secret: //'vj8DD3SMYOnrF1XKigvdebam'
                    process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(200).json({order, key_id: rzp.key_id})
            })
            .catch(err => {
                throw new Error(err)
            })
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({success: false, message:'Something went wrong'})
    }
}

const updateTransactionStatus = async(req,res,next) => {
    try{
        const userId = req.user.id
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({where: {orderid: order_id}})
        const promise1 = order.update({paymentid: payment_id, status:'SUCCESSFUL'})
        const promise2 = req.user.update({ispremiumuser: true})

        Promise.all([promise1,promise2]).then(() => {
            return res.status(202).json({success: true, message:'Transaction completed successfully', token: userController.generateAccessToken(userId, true)})
        }).catch(err => {
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({success: false, message:'Something went wrong'})
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}