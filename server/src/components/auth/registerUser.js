import authDAL from './authDAL';
import authServices from './authServices';

export const registerUser = async (req, res, next) => {
  const userFound = await authDAL.checkIfEmailExists(req.body.email);
  if (userFound) return res.json({ Error: 'Email Already Exists' });
  const newUser = await authServices.createNewUser(req.body);
  res.json(newUser);
};
