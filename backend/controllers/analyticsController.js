const Order = require('../model/Order');
const User = require('../model/User');
const Product = require('../model/Product');

const getAdminStats = async (req,res) => {
    try {
        const totalUsers = await User.countDocuments({role: 'user'});
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});

        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc,order) => acc + order.totalAmount,0);
        res,json({
            totalUsers,totalOrders,totalProducts,totalRevenus:totalRevenueData
        });

    } catch(error){
        res.status(500).json({message:'Error fetching stats',error});

    }
};

module.exports = {getAdminStats};