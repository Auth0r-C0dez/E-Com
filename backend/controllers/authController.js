const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'});
}


//register a new user

const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "user alredy exist"});
        }
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //before adding new user add the hasing pasword and the otp code
         const user = await  User.create({name, email, password:hashedPassword});  //fix

        if(user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `your log in OTP is ${otp}`;
            await sendEmail (email,`your otp registration`,message);
            res.status(201).json({
                _id :user._id,
                name:user.name,
                email:user.email,
                role : user.role ,
                token : generateToken(user._id) 
            });
        }
        else {
            res.status(400).json({message:"Invalid user data"});
        }

        // await newUser.save();
        // res.status(201).json({message:"User registered suckassfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "server eerror"});
    }
}

//logging in the user
const loginUser  = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user &&  (await bcrypt.compare(password, user.password))) {
            res.json ({
                _id : user._id ,
                name : user.name ,
                email : user.email,
                role : user.role, 
                token : generateToken(user._id)
            });
        }
        else {
            res.status(400).json({message : "Invalid details"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : " Server error "});
    }
};

const getUsers = async(req,res) => {
    try {
        const users = await User.find ({}).select('-password');
        res.json(users);
    } catch(error) {
        res.status(500).json({message : " server error"});
    }
}

module.exports = {
    registerUser, loginUser, getUsers
};