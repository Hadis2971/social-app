import { verifyToken } from '../../../auth/authToken';
import dislikePostDAL from '../likeDislikePost/dislikePostDAL';
const router = require('express').Router();

router.use(verifyToken);

router.post('/', dislikePostDAL.dislikePost);

export default router;
