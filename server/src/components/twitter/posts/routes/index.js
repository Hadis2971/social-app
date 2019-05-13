import accessPostsData from '../postsDAL';
import { verifyToken } from '../../../../helpers/authToken';
const router = require('express').Router();

router.use(verifyToken);

router.get('/', accessPostsData.getFriendsPosts);

router.post('/', accessPostsData.createNewPost);

router.put('/');
router.delete('/');

export default router;
