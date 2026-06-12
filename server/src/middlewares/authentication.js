import jwt from "jsonwebtoken";

export const isAuthenticated = (req,res,next)=>{
    console.log("middleware called")

try{

    const token = req.cookies.token;

    if(!token){

        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }
    console.log("token present")
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = decoded; // can access user id via - user.id

    next();

}
catch(error){

    return res.status(401).json({
        success:false,
        message:"Invalid token"
    });

}

}