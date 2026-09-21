const express = require('express');
const {admin} = require('../middleware/adminMiddleware');
const {protect} = require('../middleware/authMiddleware');
const {getAdminStats} = require('../controllers/analyticsController');

const router = express.Router();

router.get("/",protect,admin,getAdminStats);

module.exports = router;