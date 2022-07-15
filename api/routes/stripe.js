const router = require("express").Router();
const stripe = require("stripe")('sk_test_51LIasPByDKKy4jmTbbl8KWYPZETyKwLHCb89hsi3EF5DmjRhywpUTzdtLnm2uCeHbIKIGFQPcNg9FTPAZc6AaqpU00rFUgcpsy');

router.post("/payment", (req,res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    },
    (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr);
        }
        else{
            res.status(200).json(stripeRes);
        }
    })
});


module.exports = router;