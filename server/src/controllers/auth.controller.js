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

        
        

        return res.status(201).json({
            success:true,
            message:"user details validated successfully",
            user:{
                name,
                email,
                username,
                password
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

        const {username, password} = validation.data;

        return res.staus(200).json({
            success:true,
            message:"Login successful",
            user:{
                username
            }
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
    return res.status(200).json({
        success:true,
        message:"login"
    });
}

export const logout = async (req,res) => {
    return res.status(200).json({
        success:true,
        message:"logout"
    });
}