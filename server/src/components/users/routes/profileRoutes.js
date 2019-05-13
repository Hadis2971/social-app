import upload from '../usersFiles';
import accessUsersData from '../usersDAL';
import { verifyToken } from '../../../helpers/authToken';

const router = require('express').Router();

router.use(verifyToken);

router.get('/', accessUsersData.getProfilePictureUrl);
router.put('/', upload.single('userProfilePicture'),
  (req, res, next) => accessUsersData.updateUserProfile(req, res, next));

router.delete('/');

export default router;
