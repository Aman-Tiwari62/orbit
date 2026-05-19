import express from 'express';
import { editMyProfile, follow, otherUser, unfollow } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/:id', otherUser);
router.put('/edit', editMyProfile);
router.put('/follow/:id',follow);
router.put('/unfollow/:id', unfollow);

export default router;