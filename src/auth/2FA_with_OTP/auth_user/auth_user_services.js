const user_dao = require('./auth_user_dao')
const bcrypt = require('bcrypt');
const PhoneNumber = require('awesome-phonenumber');
const aws_sns = require('../utils/AWS/SNS/aws_sns');
const otp_utils = require('../utils/otp')


exports.signUp = async ( number ) =>{
    console.log('number :>> ', number);
    let otpSent , isSubscriber ,userExists  

    if (!number || !isValidPhoneNumber(number)) {
        throw new Error("Enter Phone number")

    }    
    userExists = await user_dao.getUser(number)

    if(userExists.length === 1){
        throw new Error("The user already Exists")
    }
    let { otp , hashedOtp} = await otp_utils.hashedOtp()
    console.log('otp :>> ', otp);
    //  isSubscriber = await aws_sns.isSubscribed(number)

    //  !isSubscriber && (await aws_sns.subscribeTopic(number)) 
    //My account is in the SMS sandbox you can only deliver SMS to the sandbox destination phone numbers
    //  you have verified so send OTP then verify to send the App's OTP
    //  await aws_sns.sendOneTimePasswordToUser(number)
     
    //  otpSent = await aws_sns.publishOtpSMS(number , otp )
    console.log('otpSent :>> ', otpSent);
     await user_dao.pendingUser(number , hashedOtp)

     return `Enter OTP to complete your registration ${ otp }`
}

module.exports.confirmPhoneNumberAtAWS = async (number , otp) => {
    let msgId 

    if (!isValidPhoneNumber(number)) {
        throw new Error("Enter Phone number")

    }    
   let confirmation = await aws_sns.confirmPhoneNumber(number , otp )

   confirmation &&  ( msgId = await aws_sns.publishOtpSMS(number , otp ) )

   return Promise.resolve(msgId)

    
}

module.exports.verifyAppOTP = async ( number , otp ) =>{

    let user
    let pendingUser = await user_dao.getPendingUser(number)
    if(pendingUser.length === 0){
        user = null
    } else {
    let mostRightOtp= pendingUser[pendingUser.length-1]
    let userOtp    = await bcrypt.compare(otp , mostRightOtp.otp)
    userOtp ? user = await user_dao.registerUser(number) : user = null
    await user_dao.deleteManyUserOtps ( mostRightOtp.phoneNumber)
     }
    
    return Promise.resolve(user)

}



function isValidPhoneNumber (phoneNumber){
    let num 
    var pn = new PhoneNumber(phoneNumber);
    pn.isValid( ) && pn.isMobile( ) && (num = pn.getNumber( 'e164' )) // -> true
    console.log('num :>> ', num);
    return num
}


