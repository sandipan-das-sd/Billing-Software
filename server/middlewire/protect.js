import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const protect=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Not authorized , no token"
                
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    } catch (error) {
        console.log("Error in protect middleware",error);
        return res.status(401).json({
            success:false,
            message:"Not authorized , token failed",
            error: error.message
        })
    }
}