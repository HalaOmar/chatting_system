const { Schema , model , Types } = require('mongoose')

const ChatSchema = new Schema( {

    members : [ 
         { type : String , required : true  } 
                ],
    image : {
        type : String 
    }, 
    name : {
        type : String , 
        required :true
    } 
} , { timestamps : true})

const Chat = model('Chats',ChatSchema)

module.exports = Chat

