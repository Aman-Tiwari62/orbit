import express from 'express';
import { comment, deleteComment, editComment } from '../controllers/comment.controller.js';
import { createPost, deletePost, editPostContent, getPosts, like} from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.js';


const router = express.Router();

router.post('/createPost', upload.single('image'), createPost);
router.get('/getPosts', getPosts);
router.put('/editPostContent/:id', editPostContent);
router.delete('/deletePost/:id', deletePost);

router.put('/like/:id', like);

router.post('/comment/:id', comment);
router.put('/editComment/:id', editComment);
router.delete('/deleteComment/:id', deleteComment);

export default router;