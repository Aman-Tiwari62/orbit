export const signup = async (req,res) => {
    return res.status(200).json({
        success:true,
        message:"signup"
    });
} 

export const login = async (req,res) => {
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