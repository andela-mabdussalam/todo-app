import models from '../models';
const { User } = models;

export default {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAndCountAll();
      if (!users.length) {
        return res.json({
          message: `No user found`
        });
      }
      return res.json({
        users: users.rows,
        noOfUsers: users.count
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  async createUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const usernameExists = await User.findOne({ where: { username } });
      const emailExists = await User.findOne({ where: { email } });
      if(usernameExists) {
        return res.status(409).json({ message: "Username in use" });
      } else if (emailExists) {
        return res.status(409).json({ message: "Email in use" })
      }
      await User.create({ username, email, password });
      return res.status(201).json({ message: "User successfully created" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
