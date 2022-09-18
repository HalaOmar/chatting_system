const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');

module.exports.generateOtp = () => { return otpGenerator.generate(6 , {
    digits:true ,
    lowerCaseAlphabets : false , 
    upperCaseAlphabets : false , 
    specialChars :false
})
}

module.exports.hashedOtp   = async () => {
    let otp = this.generateOtp()
    let salt = await bcrypt.genSalt(10)
    let hashedOtp = await bcrypt.hash(otp , salt)
    return Promise.resolve({ otp , hashedOtp})
}

