const { Schema , model , Types } = require('mongoose')

const chat_line_images_schema = new Schema ( { 

    _id : {
        type : Types.ObjectId
    } , 
    path : {
        type : String , 
        required : true 
    } , 
    sender_id : {
        type : Types.ObjectId , 
        required : true ,
        ref      : 'Users' 
    } , 
    chat_line_id : 
    {
        type : Types.ObjectId ,
        required : true ,
        ref      : 'ChatLine'
    }
} , { timestamps : true })

const ImageMessage = model('ChatLineImage',chat_line_images_schema)

module.exports = ImageMessage
