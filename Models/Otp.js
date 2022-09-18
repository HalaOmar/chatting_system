const { Schema , model } = require('mongoose');

module.exports = model('otp' , new Schema ( {
    phoneNumber : {
        type : String , 
        required : true
    } , 
    otp : {
        type : String , 
        required : true
    } ,
    createdAt : {
        type : Date , 
        default : Date.now() ,
        index : {
            expires : 300000
        }
    }
    //after 5 minutes it's deleted automatically from the Database

} , { timestamps : true}) )