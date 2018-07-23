var express = require('express');
var router = express.Router();

import { UserController } from '../controllers';

router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);


export default router;
