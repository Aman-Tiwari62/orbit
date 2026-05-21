import jwt from "jsonwebtoken";

export const isAuthenticated = (req,res,next)=>{
    console.log("middleware called")

try{

    const token = req.cookies.token;
    console.log(token);

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
    console.log('token decoded');

    req.user = decoded; // can access user id via - user.id
    console.log(req.user);

    next();

}
catch(error){

    return res.status(401).json({
        success:false,
        message:"Invalid token"
    });

}

}