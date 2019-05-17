import { checkIfEmailExists } from './checkUsers';
import authHelpers from '../../helpers/authHelpers';
import Users from '../../database/models/Users';

export const registerUser = async (req, res, next) => {
  const userFound = await checkIfEmailExists(req.body.email);
  if (userFound) return res.json({ Error: 'Email Already Exists' });

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  newUser.password = await authHelpers.hashUserPassword(newUser.password);
  const user = await Users.create(newUser);

  res.json(user);
};
