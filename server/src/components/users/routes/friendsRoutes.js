import accessUsersData from '../usersDAL';
import { verifyToken } from '../../../helpers/authToken';

const router = require('express').Router();

router.use(verifyToken);

router.get('/', accessUsersData.getAllFriendRequests);
router.post('/addFriend', accessUsersData.addNewFriend);
router.post('/confirmFriendRequest', accessUsersData.confrimFriendRequest);

export default router;
