const express = require('express');
const router  = express.Router()
const chat_line_controller = require('./chatLines_controller.js')
const auth_controller = require('../auth/Auth_By_JWT')
const fileuploader    = require('../../uploader/imageupload')
const videoUploader   = require('../../uploader/videoupload')


router.use(auth_controller.authenticate , auth_controller.isAuthenticated)

router.route('/')
.post( chat_line_controller.addChatLines)
.delete( chat_line_controller.deleteChatLines)
.get(chat_line_controller.getUserChatLines)


router.route('/messageDelivered')
.put(chat_line_controller.messageDeliverd)


router.route('/file').
post( fileuploader.single('my_file'), chat_line_controller.addChatLines)

router.route('/video')
.post( videoUploader.single('my_video') , chat_line_controller.addChatLines)



module.exports = router
