const express = require('express');
const router  = express.Router()
const user_controller = require('./user_controller')



router.route('/')
.get(user_controller.getUser)
.delete(user_controller.deleteUser)
.put(user_controller.updateUser)



module.exports = router