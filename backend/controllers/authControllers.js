import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;
        if(!(firstName && lastName && username && email && password)){
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
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword
        });

        const token = jwt.sign(
            {user_id: user._id, email: user.email, role: user.role},
            process.env.TOKEN_KEY,
            {expiresIn: "2h"}
        );

        user.token = token;
        user.password = undefined;
        return res.status(201).json(user);
        
    } catch(err){
        console.log(err);
        return res.status(500).send("Server error");
    }
}


export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).send("All fields are required");
        }

        const user = await User.findOne({email: email.toLowerCase()});
        if( user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id : user._id, email: user.email, role: user.role},
                process.env.TOKEN_KEY,
                {expiresIn: "2h"}
            );
            user.token = token;
            user.password = undefined;
            return res.status(200).json(user);
        }
        return res.status(401).send("Unauthorized");

    }catch(err){
        console.log(err);
        return res.status(500).send("Server error");
    }
}