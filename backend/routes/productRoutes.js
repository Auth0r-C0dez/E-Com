const express = require("express");
const {protect} = require ('../middleware/authMiddleware');
const {admin} = require ('../middleware/adminMiddleware');
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const multer = require('multer');
const upload = multer({dest : 'uploads/'})


const router = express.Router();

// POST is used to create a new resource
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
// PUT is used to replace or update an existing resource 
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;