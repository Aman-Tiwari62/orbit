export const getPosts = async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"get all posts"
    });
}

export const editPost = async (req, res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`edit post with postid: ${postId}`
    });
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`delete post with postid: ${postId}`
    });
}

export const createPost = async (req, res) => {
    return res.status(200).json({
        success:true,
        message:"create post"
    });
}

export const like = async (req, res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`like post with postid: ${postId}`
    });
}

export const unlike = async (req, res) => {
    const postId = req.params.id;
    return res.status(200).json({
        success:true,
        message:`unlike post with postid: ${postId}`
    });
}