const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

const createOrder = async (req,res) => {
    try {
        const {items, totalAmount, address, paymentId} = req.body;
        if(!items || items.length === 0 || !totalAmount || ! address) {
            return res.status(400).json({message : 'Invalid order data'});
        }
        else {
            const order = new Order ({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();
            const message = `Dear ${req.user.name},\n\n Thnx fr order. Ur oder has been created wids below order det
            :\n\nOrder ID : ${order._id}\nTotal amount : $${totalAmount}\nShipping Address : ${address}
            \n\nWe will notify once shipped.\n\nBest regards, \nGod Rana`;

            await sendEmail(req.user.email, 'Order createad', message);
            res.status(201).json({message: 'Order created suxesfullie', order});
        }
        
    }catch(error) {
            res.staus(500).json({message:'Error creating ord3er',error});
            console.log(error);
            console.log("error in creating order");
        }
};

const myOrders = async (req,res) => {
    try {
        const orders = await Order.find({user: req.user._id}).populate('items.productId', 'name price');
        res.json(orders);
    }catch(error) {
        res.status(500).json({message:'error fetching orders', error});
        console.log(error);
        console.log("error in fetching orders");
    }
};

const getOrders = async (req,res) => {
    try  {
        const orders = await Order.find({}).populate('user','id name');
    }catch(error) {
        res.status(500).json({message:'error fetching orders', error});
        console.log(error);
        console.log("error in  get all orders code block");
    }
};

const updateOrderStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({message: 'order status updated',order});
        }
        else {
            res.status(404).json({message:'order not found'});
        }
    }catch(error) {
        res.status(500).json({message:'Error updating order status', error});
    }
}
 

module.exports = {
    createOrder,
    myOrders,updateOrderStatus,getOrders
};