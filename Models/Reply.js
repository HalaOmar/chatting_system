const { Schema , model , Types} = require('mongoose')

const reply_schema = new Schema ( {
    _id : { 
        type : Types.ObjectId
    } , 
    message  : {
        type : String , 
        required : true
    },
    sender : {
        type : String , 
        required : true
    },
    chat_line_id :{
        type : Types.ObjectId , 
        ref  : 'ChatLine' ,
        required : true
    }
},{timestamps : true})

const Reply = model('replyes',reply_schema)

module.exports = Reply