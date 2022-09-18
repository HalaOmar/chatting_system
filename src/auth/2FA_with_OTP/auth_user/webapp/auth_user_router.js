const express = require('express');
const router  = express.Router()
const user_controller = require('./auth_user_controller')

router.route('/signup')
.post(user_controller.signUp)
router.route('/verify/AppOtp')
.post(user_controller.verifyAppOTP) 
router.route('/verify/awsotp')//This used to verify users numbers @ AWS to send otp msg to them.
.post(user_controller.confirmPhoneNumberAtAWS)

module.exports = router