import Users from '../../database/models/Users';

export const checkIfEmailExists = async (email) => {
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (user) return true;
    return false;
  } catch (error) {
    console.log('inside checkIfEmailExists error', error);
  }
};
