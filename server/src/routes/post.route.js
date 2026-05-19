import express from 'express';
import { comment, deleteComment, editComment } from '../controllers/comment.controller.js';
import { createPost, deletePost, editPost, getPosts, like, unlike } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/createPost', createPost)
router.get('/getPosts', getPosts);
router.put('/editPost/:id', editPost);
router.delete('/deletePost/:id', deletePost);

router.put('/like/:id', like);
router.put('/unlike/:id', unlike);

router.post('/comment/:id', comment);
router.put('/editComment/:id', editComment);
router.delete('/deleteComment/:id', deleteComment);

export default router;