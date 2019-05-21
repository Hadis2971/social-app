import { verifyToken } from '../../../auth/authToken';
import likePostDAL from '../likeDislikePost/likePostDAL';
const router = require('express').Router();

router.use(verifyToken);

router.post('/', likePostDAL.likePost);

export default router;
