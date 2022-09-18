const express = require('express');
const router  = express.Router()
const chat_members_controller = require('./chat_members_controller')

router.route('/')
.get(chats_controller.getAllChats)
.post(chats_controller.createChat)
.delete(chats_controller.deleteChat)

router.route('/all')
.get( chats_controller.getAllChats)
.delete( chats_controller.deleteAllChats)

module.exports = router