import Post from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getMyPosts = async (req, res) => {
    try{
        // const page = Number(req.query.page) || 1
        // const limit = Number(req.query.limit) || 10;
        // const skip = (page - 1) * limit;

        const posts = await Post.find({
            author:req.user.id
        })
        .populate("author", "name username profilePic")
        .sort({createdAt:-1})
        // .skip(skip)
        // .limit(limit)

        return res.status(200).json({
            success:true,
            message:"myPosts fetched successfully",
            posts
        })

    } catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUserPosts = async (req, res) => {
    try{
        // const page = Number(req.query.page) || 1
        // const limit = Number(req.query.limit) || 10;
        // const skip = (page - 1) * limit;

        const posts = await Post.find({
            author:req.params.userId
        })
        .populate("author", "name username profilePic")
        .sort({createdAt:-1})
        // .skip(skip)
        // .limit(limit)

        return res.status(200).json({
            success:true,
            message:"userPosts fetched successfully",
            posts
        })

    } catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getFeedPosts = async (req, res) => {
    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
        .populate("author", "name username profilePic")
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)

        return res.status(200).json({
            success:true,
            message:"feedPosts fetched successfully",
            posts
        })

    } catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Pagination is the process of splitting a large dataset into smaller, discrete chunks (pages) instead of sending all the data at once. If your app has 10 posts, it works perfectly. If your app grows to 10,000 posts, that single query will pull all 10,000 documents from MongoDB, populate the author details for every single one, convert it into a massive JSON string, and send it over the network. This causes database & Server Strain and network & Frontend Lag.
// There are two primary ways to implement pagination in MongoDB: Offset based and Cursor based.
// offset based pagination: Offset-based pagination is the most common pagination technique used in SQL and MongoDB. It works by skipping a certain number of records and then fetching the next set.
// cursor based pagination:This approach relies on a unique pointer (a cursor) from the last item of the previous batch—usually a combination of a timestamp (createdAt) and the document _id.


export const editPostContent = async (req, res) => {
    console.log("edit post content called");
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"post not found"
            });
        }
        if(post.author.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"you are not authorized to edit this post"
            });
        }
        const {content} = req.body;
        
        if(!content){
            return res.status(400).json({
                success:false,
                message:"post content is required"
            });
        }
        post.content = content;
        await post.save();
        await post.populate("author", "name username profilePic");
        return res.status(200).json({
            success:true,
            message:"post updated successfully",
            post
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

export const deletePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"post not found"
            });
        }
        if(post.author.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"you are not authorized to delete this post"
            });
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({
            success:true,
            message:"post deleted successfully"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

export const createPost = async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required."
            });
        }
        const uploadedImage = await uploadToCloudinary(req.file.buffer);
        const imageUrl = uploadedImage.secure_url;
        const {content} = req.body; //content is optional.

        const newPost = new Post({
            author: req.user.id,
            content,
            image: imageUrl
        });
        await newPost.save();
        await newPost.populate("author", "name username profilePic");
        return res.status(201).json({
            success:true,
            message:"post created successfully",
            post:newPost
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

export const like = async (req, res) => {
    console.log("like called");
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"post not found"
            });
        }
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            post.likes.includes(req.user.id)
                ? { $pull: { likes: req.user.id } }
                : { $push: { likes: req.user.id } },
            { new: true }
        ).populate("author", "name username profilePic");

        return res.status(200).json({
            success: true,
            message: "post like status updated successfully",
            post: updatedPost
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });     
    }
}
