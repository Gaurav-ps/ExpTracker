const Orders = require('../models/orders')

const addOrders = async(req,res,next) => {
    try{
        console.log(req.body)
        const amount = req.body.Amount
        const description = req.body.Description
        const tableNum = req.body.TableNum
        const data = await Orders.create({amount: amount, description: description, table: tableNum})
        res.status(201).json({orderDetails: data})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

const getOrders = async(req,res,next) => {
    try{
        const orders = await Orders.findAll();
        res.status(200).json({allOrders: orders})
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

const deleteOrders = async(req,res,next) => {
    try{
        const uId = req.params.id;
        await Orders.destroy({where: {id: uId}})
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

module.exports = {
    addOrders,
    getOrders,
    deleteOrders
}