import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!(username && email && password)){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or:[
                {email},
                {username}
            ]
        });
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login"
            });
            // redirect to login page
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.trim().toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            {user_id: user._id, email: user.email, role: user.role},
            process.env.TOKEN_KEY,
            {expiresIn: "2h"}
        );

        return res.status(201).json({
            success: true,
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
        
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
        if( user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id : user._id, email: user.email, role: user.role},
                process.env.TOKEN_KEY,
                {expiresIn: "2h"}
            );
            return res.status(200).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}