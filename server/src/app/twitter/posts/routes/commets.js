import { verifyToken } from '../../../auth/authToken';
import commnetsDAL from '../commentsDAL';
const router = require('express').Router();

router.use(verifyToken);

router.get('/:post/:offset', commnetsDAL.loadMoreCommentsForPost);

router.post('/', commnetsDAL.createComment);

export default router;
