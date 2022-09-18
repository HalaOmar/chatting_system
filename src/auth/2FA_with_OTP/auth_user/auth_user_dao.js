const Models    = require('../../../../Models')
const User      = Models.Users
const Otp       = Models.Otp

module.exports.registerUser = (number) =>{
    let user =  new User({
        phoneNumber : number 
    })

    user.generateJwt()

    return user.save()

}
module.exports.getUser =  (number)=>{
    return User.find({
        phoneNumber : number
 })
}

module.exports.pendingUser = async ( number , otp ) =>{
    let otpHolder 
    otpHolder = new Otp({
        phoneNumber : number ,
        otp         : otp
    })

    return otpHolder.save()
}

module.exports.getPendingUser =  (number ) =>{
    return Otp.find({
        phoneNumber : number
    })

}

module.exports.deleteManyUserOtps = ( number ) =>{
  return  Otp.deleteMany({
        phoneNumber : number
    })
}