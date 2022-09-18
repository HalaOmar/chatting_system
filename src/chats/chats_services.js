const chat_dao = require('./chats_dao')
const mongoose = require('mongoose');

exports.createChat = ( chat ) =>{

        chat.members = castMembers(chat.members)
        return chat_dao.createChat(chat)
}

exports.getChatIdOfMembers = ( members ) =>{
        members.map( member => mongoose.Types.ObjectId(member))
        return chat_dao.getChatIdOfMembers(members)

}

exports.getAllUserChats = ( userId ) =>{

        mongoose.Types.ObjectId(userId)
        return chat_dao.getAllUserChats(userId)
}
function castMembers (members) {

        members.map( member => ({member_id:mongoose.Types.ObjectId(member.member_id)}))//curely braces here because the return value is object 
        return members       
}