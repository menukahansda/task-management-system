import jwt from "jsonwebtoken";

const auth = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    console.log("AUTH MIDDLEWARE HIT");
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            success: false,
            message: "Token required"
        });
    }

    try{
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default auth;