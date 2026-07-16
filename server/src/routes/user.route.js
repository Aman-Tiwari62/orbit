import express from 'express';
import { fetchUser, editBio, editProfilePicture, editName, follow, otherUser, unfollow } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/me', fetchUser);
router.get('/:id', otherUser);
router.put('/edit/bio', editBio);
router.put('/edit/profilePicture', upload.single("profilePic"), editProfilePicture);
router.put('/edit/name', editName);
router.put('/follow/:id',follow);
router.put('/unfollow/:id', unfollow);

export default router;