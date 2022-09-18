const { Schema , model , Types } = require('mongoose')

const chat_members_schema = new Schema( {

    chat_id : {
        type : Types.ObjectId , 
        required :true ,
        ref : 'Chat'
    } , 
    member_id : {
        type : Types.ObjectId , 
        required : true , 
        ref : 'Users'
    }

},{ timestamps : true })

const ChatMembers = model('ChatMembers',chat_members_schema)

module.exports = ChatMembers