import accessUsersData from '../usersDAL';
import { verifyToken } from '../../../helpers/authToken';

const router = require('express').Router();

router.use(verifyToken);

router.post('/', accessUsersData.getAllSearchedUsers);

export default router;
