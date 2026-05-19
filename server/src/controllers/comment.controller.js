export const comment = async (req, res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`comment on postid: ${postId}`
    });
}

export const editComment = async (req,res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`edit comment, ostid: ${postId}`
    });
}

export const deleteComment = async (req,res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`delete comment, ostid: ${postId}`
    });
}