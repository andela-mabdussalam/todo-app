// var express = require('express')
// var app = express()

var express = require('express')
var router = express.Router()

import { UserController } from '../controllers';

router.route('/').get(UserController.getAllUsers);

export default router;
