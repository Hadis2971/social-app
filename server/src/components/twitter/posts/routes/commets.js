import { verifyToken } from '../../../../helpers/authToken';
import commnetsDAL from '../commentsDAL';
const router = require('express').Router();

router.use(verifyToken);

router.post('/', commnetsDAL.createComment);

export default router;
