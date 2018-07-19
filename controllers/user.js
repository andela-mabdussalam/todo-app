import models from '../models';

const { User } = models;

export default {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll()
      return res.send(users);
    } catch (err) {
      console.log('There is an error');
    }

  }
}
