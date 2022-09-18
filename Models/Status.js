const { Schema , model , Types } = require('mongoose')

const status_schema = new Schema({
    _id :{
        type : Types.ObjectId
    } ,
    status : {
        type : String
    } ,
    user_id :{
        type : Types.ObjectId ,
        required :true , 
        ref:'Users'
    }


} , { timestamps : true})

module.exports = model('Status' , status_schema )