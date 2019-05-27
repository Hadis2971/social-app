import friendsDAL from '../friendsDAL';
const router = require('express').Router();

router.get('/:userID', friendsDAL.getOnlineFriends);

export default router;
