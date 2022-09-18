const express = require('express');
const router  = express.Router()
const chats_controller = require('./chats_controller')
const auth_controller = require('../auth/Auth_By_JWT')
// const fileuploader    = require('../../uploader/imageupload')
// const videoUploader   = require('../../uploader/videoupload')


router.use(auth_controller.authenticate , auth_controller.isAuthenticated)
router.route('/')
.get(chats_controller.getChatOfMembers)
.post(chats_controller.createChat)
.delete(chats_controller.deleteChat)

router.route('/all')
.get( chats_controller.getAllUserChats)
.delete( chats_controller.deleteAllChats)

module.exports = router