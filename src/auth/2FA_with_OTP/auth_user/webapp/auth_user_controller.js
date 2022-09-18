const user_services = require('../auth_user_services')

module.exports.signUp =  async ( req , res ) => {
    try{
        let number = req.body.number ? req.body.number : null
    
        let  result = await user_services.signUp(number)
        
        res.json({result})

    }catch(e){
        res.json({ msg : e.toString() })
    }
}

module.exports.verifyAppOTP = async ( req , res ) =>{
    try{
        
    let phoneNumberHolder = req.body.number ? req.body.number : null
    let otp = req.body.otp ? req.body.otp : null
    let user = await user_services.verifyAppOTP(phoneNumberHolder , otp) //If the integrity of the input data is well the user will be returned
    
        res.status(200).json({
            user 
        })
    
    }catch(e){
        console.log(e)
        res.status(400).json({
            failureMsg : e
        })
    }
}

module.exports.confirmPhoneNumberAtAWS = async ( req , res) =>{
    try{

        let number = null , otp = null
        
         req.body.number  && (number = req.body.number)
         req.body.aws_otp && (otp = req.body.aws_otp)

        let msg = await user_services.confirmPhoneNumberAtAWS(number , otp )
        res.json({
            SuccessMsg : `Enter AWS OTP ${msg}`
        })

    }catch(e){
        console.log(e);
        res.json({
           e
        })

    }

}