import  User  from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { validateEmail, validateName, validatePassword, validateUsername } from "../utils/validation.js";

const signupValidation = (data)=>{

    let {name, username, email, password} = data;

    // NAME VALIDATION:
    const nameValidation = validateName(name);
    if(!nameValidation.success){
        return {
            success:false,
            message:nameValidation.message
        }
    }

    // USERNAME VALIDATION:
    const usernameValidation = validateUsername(username);
    if(!usernameValidation.success){
        return {
            success:false,
            message:usernameValidation.message
        }
    }

    // EMAIL VALIDATION:
    const emailValidation = validateEmail(email);
    if(!emailValidation.success){
        return {
            success:false,
            message:emailValidation.message
        }
    }

    // PASSWORD VALIDATION:
    const passwordValidation = validatePassword(password);
    if(!passwordValidation.success){
        return {
            success:false,
            message:passwordValidation.message
        }
    }

    // VALIDATION SUCCESSFUL:
    return {
        success:true,
        message:"Validation Successful.",
        data:{
            name,
            username,
            email,
            password
        }
    }
}

const loginValidation = (data)=>{
    let {usernameOrEmail, password} = data;

    let emailLogin = true;
    const emailValidation = validateEmail(usernameOrEmail);
    if(!emailValidation.success){
        emailLogin = false;
        const usernameValidation = validateUsername(usernameOrEmail);
        if(!usernameValidation.success){
            return {
                success:false,
                message:"Invalid username/email format."
            }
        }
    }

    const passwordValidation = validatePassword(password);
    if(!passwordValidation.success){
        return {
            success:false,
            message:"Invalid password format."
        }
    }
    return {
        success:true,
        message:"Validation successful.",
        emailLogin,
        data:{
            usernameOrEmail,
            password
        }
    }
}

export const signup = async (req,res) => {
    try{
        const validation = signupValidation(req.body);
        if(!validation.success){
            return res.status(400).json({
                success:false,
                message:validation.message
            })
        }
        
        const {name, username, email, password} = validation.data;

        // CHECK IF EMAIL IS ALREADY REGISTERED AND USERNAME IS ALREADY TAKEN:
        // (THE BELOW QUERY QUERIES BOTH THINGS SIMULTANEOUSLY.)

        const [existingUser, usernameExists] = await Promise.all([
            User.findOne({email}),
            User.findOne({username})
        ]);

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already registered, please login."
            })
        }

        if(usernameExists){
            return res.status(409).json({
                success:false,
                message:"Username already taken, please choose different username."
            })
        }

        // VERIFY EMAIL VIA OTP: LATER ***
        // HASH PASSWORD BEFORE STORING: LATER ***

        const user = await User.create({
            name,
            username,
            email,
            password
        })
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRES_IN
            }
        );
        // res.cookie() is an Express method used to tell the browser: "store this cookie".
        res.cookie(
            "token",
            token,
            {
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:
                    process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
                maxAge:Number(process.env.COOKIE_MAX_AGE)
            }
        );

        return res.status(201).json({
            success:true,
            message:"user signup successfully",
            user:{
                id:user._id,
                name:user.name,
                username:user.username,
                email:user.email,
                profilePic:user.profilePic,
                bio:user.bio,
                followers:user.followers,
                following:user.following,
            }
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

export const login = async (req,res) => {
    try{
        const validation = loginValidation(req.body);
        if(!validation.success){
            return res.status(400).json({
                success:false,
                message:validation.message
            })
        }

        const {usernameOrEmail, password} = validation.data;

        let user;
        if(validation.emailLogin){
            user = await User.findOne({email:usernameOrEmail}).select("+password");
        }
        else {
            user = await User.findOne({username:usernameOrEmail}).select("+password");
        }
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user with given username/email not found"
            });
        }

        if(password!==user.password){
            return res.status(401).json({
                success:false,
                message:"Incorrect password"
            });
        }

        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRES_IN
            }
        );
        // res.cookie() is an Express method used to tell the browser: "store this cookie".
        res.cookie(
            "token",
            token,
            {
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:
                    process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
                maxAge:Number(process.env.COOKIE_MAX_AGE)
            }
        );

        return res.status(201).json({
            success:true,
            message:"user login successfully",
            user:{
                id:user._id,
                name:user.name,
                username:user.username,
                email:user.email,
                profilePic:user.profilePic,
                bio:user.bio,
                followers:user.followers,
                following:user.following,
            }
        });


    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const logout = async (req,res) => {
    try{
        res.clearCookie(
            "token",
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:
                    process.env.NODE_ENV==="production"
                    ? "none"
                    : "lax"
            }
        );
        return res.status(200).json({
            success:false,
            message:"logout successfully.",
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}