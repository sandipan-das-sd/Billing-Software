import { UserModel } from "../model/auth.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
export const register=async(req,res)=>{
const {email,password,name}=req.body;
try {
    const isEmailExits=await UserModel.findOne({
        email
    });
    if(isEmailExits)
    {
        return res.status(400).json({
            success:false,
            message:"Email already exists"
        })
    }

    const hashPassword=await bcrypt.hash(password,10);
    const newUser=new UserModel({
        email,
        password:hashPassword
    })
    await newUser.save();
    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:newUser
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Registration failed",
        error:error.message
    })
}
}


export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const isEmailExists=await UserModel.findOne({
            email
        })
        if(!isEmailExists)
        {
            return res.status(400).json({
                success:false,
                message:"Email does not exits . Please Register"
            })
        }

        const passwordCompare=await bcrypt.compare(password,isEmailExists
            .password
        )
        if(!passwordCompare)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        //pass the payload to jwt
        const payload={
            email:isEmailExists.email,
            id:isEmailExists._id,

        }

        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'1d'

        })
        
        const userData = {
            id: isEmailExists._id,
            email: isEmailExists.email,
            name: isEmailExists.name
        }
        
        res.status(200).json({
            success:true,
            message:"Login Successful",
            token,
            user: userData
        })
    } catch (error) {
        
    }
}


export  const getUsers=async(req,res)=>{
    try {
        const user=await UserModel.find({select:"-password"});
        res.status(200).json({
            success:true,
            user:user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Unable to fetch users"
        })
    }
}


export const logout=async(req,res)=>{
    try {
        const token=null;
        res.status(200).json({
            success:true,
            message:"Logout successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Logout failed"
        })
        
    }
}