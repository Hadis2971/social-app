import accessFriendsData from '../friendsDAL';
import { verifyToken } from '../../auth/authToken';

const router = require('express').Router();

router.use(verifyToken);

router.get('/', accessFriendsData.getAllFriendRequests);
router.post('/addFriend', accessFriendsData.addNewFriend);
router.post('/confirmFriendRequest', accessFriendsData.confrimFriendRequest);

export default router;
