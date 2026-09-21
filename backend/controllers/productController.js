const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req,res) => {
    try {
        const products = await Product.find({}); //means:Find all documents in the products collection.The {} means no filter.
        res.json(products);
    }catch(error) {
        res.status(500).json({message:'Server error'});
    }
};

const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({message : 'wo hai nhi apne paas'});
        }
    } 
    catch(error) {
        res.status(500).json({message:'Server error'});
        console.log(error);
    }
};

const createProduct = async(req,res) => {
    try{
    const {name, description, price, category, stock} = req.body;
    let imageUrl= '';
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        imageUrl = result.secure_url;
    }
    const product = new Product ({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
    } catch (error){
        console.error('createProduct error:', error);
        res.status(500).json({message:'Server error'});
    }

};

const updateProduct = async (req,res) => {
    try {
        const {name, description, price, category, stock} = req.body;
        const product = await Product.findById(req.params.id);
        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price  = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }
        else {
            res.status(404).json({message : 'Product not found'});
        }
    }
    catch (error) {
        console.error('updateProduct error:', error);
        res.status(500).json({message:'Server error'});
    }
};

const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product) {
            await product.deleteOne();
            res.json({message : 'product removed'});
        }
        else {
            res.status(404).json({message : 'Product nt found'});
        }
    } catch (error) {
        console.error('deleteProduct error:', error);
        res.status(500).json({message : 'Server error'});
    }
};

module.exports = {
    deleteProduct,updateProduct,createProduct,getProductById,getProducts
};