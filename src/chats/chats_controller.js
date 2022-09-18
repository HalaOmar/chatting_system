const { default: mongoose } = require('mongoose')
const chat_srvices = require('./chats_services')

exports.createChat = async ( req , res  ) =>{
   
    let chat = {
    
        members    : req.body.members || null , 
        name       : req.body.name    || req.body.sender_phone || null,
        image      : (req.file && req.file.path )|| null
    }

    let addOp = await chat_srvices.createChat(chat)

}

exports.createGroup = ( req , res )=>{

}

exports.deleteChat = ( req , res  ) =>{

    let chat_id = req.body.chat_id || null

}

exports.getChat = ( req , res  ) =>{

}

exports.getChatOfMembers = async ( req , res  ) =>{

    let members = req.body.members  || null;
    let chat = await chat_srvices.getChatIdOfMembers(members)
    res.json({chat})

}

exports.deleteAllChats = ( ) =>{

}

exports.getAllUserChats = async ( req , res ) =>{

    // let user_id = req.body.userId ? req.body.userId : null 
    let user_id = req.user._id

    let user_chats = await chat_srvices.getAllUserChats(user_id)

    res.json(user_chats)

}
