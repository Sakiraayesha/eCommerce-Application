const router = require("express").Router();
const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try{
        const savedOrder= await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedOrder);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted.");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET USER ORDER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const order = await Order.findOne({userId: req.params.id});
        res.status(200).json(order);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.latest;
    try{
        const orders = query? await Order.find().sort({_id: -1}).limit(5) : await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET MONTHLY SALES
router.get("/sale", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const secondLastMonth = new Date(date.setMonth(lastMonth.getMonth() - 5));

    try{
        const sale = await Order.aggregate([
            {
                $match: {createdAt: {$gte: secondLastMonth}}
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$subtotal"
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ]).sort({ _id: -1 }); 
        res.status(200).json(sale);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET MONTHLY ORDERS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const secondLastMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try{
        const sale = await Order.aggregate([
            {
                $match: {createdAt: {$gte: secondLastMonth}}
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]).sort( { _id: -1 }); 
        res.status(200).json(sale);
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;