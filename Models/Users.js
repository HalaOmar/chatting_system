const { Schema , model , Types } = require('mongoose')
const jwt = require('jsonwebtoken')
const user_schema = new Schema( {

    phoneNumber : {
        type : String , 
        required : true , 
    } ,
    jwt :{
        type : String ,
        required:true
    },
    image_path : {
        type : String 
    } ,
    nick_name : {
        type : String 
    } ,
    brief : {
        type : String 
    }
} , { timestamps : true })

user_schema.methods.generateJwt = function(){

    const token = jwt.sign(
        { _id : this._id , 
          phoneNumber : this.phoneNumber 
        } ,
        process.env.JWT_SECRET_KEY ,
        // {
        //  expiresIn : ""}
    )
    this.jwt = token

}
const Users = model('user',user_schema)

module.exports = Users