import models from '../models';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const { User } = models;

export default {
  createUser(req, res) {
    const { username, email, password } = req.body;
    User.findOrCreate({
      where: {
        [Op.or]: [
          { username },
          { email },
        ]
      },
      defaults: { username, email, password }
    })
      .spread((user, created) => {
        if (created) {
          const { id, email: newEmail } = user;
          const token = jwt.sign({ id, email: newEmail },
            process.env.SECRET,
            { expiresIn: '10h' });
          return res.send({ success: true, message: 'User Created Successfully', token });
        }
        return res.status(409).send({ success: false, message: 'User already exists' });
      }).catch(() => res.status(500).send({ success: false, message: 'Unexpected error, contact admin' }));
  },
  login(req, res) {
    const { username, email, password } = req.body;
    User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    }).then((user) => {
      if (user) {
        const { id, email } = user;
        if (user.validPassword(password)) {
          const token = jwt.sign({ id, email }, process.env.SECRET, { expiresIn: '10h' });
          return res.send({ success: true, message: 'User Successfully logged in', token })
        }
        return res.status(403).send({ success: false, message: 'Invalid Username/Password' });
      }
      return res.status(400).send({ success: false, message: 'User not registered' });
    }).catch((error) => res.status(500).send({ success: false, message: error }))
  },
  updateUser(req, res) {
    User.findById(req.params.id).then((user) => {
      const { username = user.username, email = user.email, newPassword, oldPassword } = req.body;
      let password;
      if (!user) {
        return res.status(404).send({ success: false, message: 'User does not exist' });
      }
      if (oldPassword && newPassword && user.validPassword(oldPassword)) {
        password = newPassword;
      }
      const requestBody = {
        password: password || user.password,
        username,
        email
      }
      user.update(requestBody)
        .then(() => res.send({ success: true, message: 'User successfully updated' }))
        .catch((error) => res.status(500).send({ success: false, message: error }));

    }).catch(() => {
      return res.status(500).send({ success: false, message: 'Unexpected error' });
    })
  },
}
