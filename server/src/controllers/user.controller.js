export const otherUser = async (req, res) => {
    const otherUserId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`Other user details, id: ${otherUserId}`
    });
}

export const editMyProfile = async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"edit your profile"
    });
}

export const follow = async (req, res) => {
    const otherUserId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`you followed xyz : ${otherUserId}`
    });
}

export const unfollow = async (req, res) => {
    const otherUserId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`you unfollowed xyz : ${otherUserId}`
    });
}