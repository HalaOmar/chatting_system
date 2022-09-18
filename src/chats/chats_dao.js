const { default: mongoose } = require('mongoose');
const models = require('../../Models');
const Chat = models.Chat

exports.createChat = ( chat ) => {

    let newchat = new Chat(chat)
    return newchat.save()

}

exports.getChatIdOfMembers = ( members ) =>{
    console.log("from dao ", members)
    // Chat.find({ members : { $all :members }}) 
 return  Chat.find({ members })
}

exports.getAllUserChats = ( userId ) =>{

  return  Chat.find( {
        members : { $elemMatch : { $eq : userId}}
    })

}