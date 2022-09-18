const { Schema , model , Types} = require('mongoose')

const chat_line_schema = new Schema ( {

    message  : {
        type : String , 
        required : true
    },
    sender : {
        type : String , 
        required : true
    },
    chat_id :{
        type : Types.ObjectId , 
        ref  : 'Chat' ,
        required : true
    },
    path : {
        type : String
    },
    s3_url : {
        type : String
    },
    reply_count : {
        type : Number
    },
    message_info : {

        Delivered : [{
            to : {
                type : Types.ObjectId , 
            },
            at :{
                type :  Date
            }           
        }],
        Read :[{
            by : {
                type : Types.ObjectId , 
            } ,
            at : { 
                type : Date
            }
        }]
    }    
},{timestamps : true})

const ChatLine = model( 'ChatLine',chat_line_schema)

module.exports = ChatLine