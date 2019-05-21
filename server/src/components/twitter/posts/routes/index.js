import accessPostsData from '../postsDAL';
import { verifyToken } from '../../../auth/authToken';
const router = require('express').Router();

router.use(verifyToken);

router.get('/requestedProfile/:user/:offset', accessPostsData.loadMorePostsForRequestedProfile);
router.get('/:user/:offset', accessPostsData.getFriendsPosts);
router.get('/', accessPostsData.getFriendsPosts);

router.post('/', accessPostsData.createNewPost);

router.put('/');
router.delete('/');

export default router;
