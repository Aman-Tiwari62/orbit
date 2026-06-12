import User from '../models/user.model.js';
import { validateName } from '../utils/validation.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

export const fetchUser = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:`User fetched successfully`,
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

export const otherUser = async (req, res) => {
    try{
        const otherUserId = req.params.id;
        const user = await User.findById(otherUserId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:`User fetched successfully`,
            user:{
                id:user._id,
                name:user.name,
                username:user.username,
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

export const editBio = async (req, res) => {
    try{
        const userId = req.user.id;
        const { bio } = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        bio.trim();
        if(bio.length>150){
            return res.status(400).json({
                success:false,
                message:"bio can be of max 150 characters"
            });
        }
        
        user.bio = bio;
        await user.save();  
        return res.status(200).json({
            success:true,
            message:"bio updated"
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

export const editProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const uploadedImage = await uploadToCloudinary(
            req.file.buffer
        );

        user.profilePic = uploadedImage.secure_url;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const editName = async (req, res) => {
    try{
        const userId = req.user.id;
        const { name } = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        const nameValidation = validateName(name);
        if(!nameValidation.success){
            return res.status(400).json({
                success:false,
                message:nameValidation.message
            });
        }
        
        user.name = name;
        await user.save();  
        return res.status(200).json({
            success:true,
            message:"name updated",
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}


export const follow = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currentUserId.toString() === targetUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself"
            });
        }

        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const currentUser = await User.findById(currentUserId);

        const isAlreadyFollowing = currentUser.following.includes(
            targetUserId
        );

        if (isAlreadyFollowing) {
            return res.status(400).json({
                success: false,
                message: "Already following this user"
            });
        }

        await User.findByIdAndUpdate(
            currentUserId,
            {
                $addToSet: {
                    following: targetUserId
                }
            }
        );

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $addToSet: {
                    followers: currentUserId
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "User followed successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



export const unfollow = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currentUserId.toString() === targetUserId) {
            return res.status(400).json({
                success: false,
                message: "You cannot unfollow yourself"
            });
        }

        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const currentUser = await User.findById(currentUserId);

        const isFollowing = currentUser.following.includes(
            targetUserId
        );

        if (!isFollowing) {
            return res.status(400).json({
                success: false,
                message: "You are not following this user"
            });
        }

        await User.findByIdAndUpdate(
            currentUserId,
            {
                $pull: {
                    following: targetUserId
                }
            }
        );

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $pull: {
                    followers: currentUserId
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "User unfollowed successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};