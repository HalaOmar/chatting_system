const AWS = require('aws-sdk')
const { SNSClient ,
        PublishCommand,
        CreateSMSSandboxPhoneNumberCommand } = require('@aws-sdk/client-sns'); 
const Topic     = require('./Topic')
const myConfig  = require('../config')
const sns_client = new SNSClient(myConfig)
const EndPoints = require('./Endpoints');
const sms_sender = new Topic("SMS_Sender",process.env.SMS_SENDER_ARN)
const CONOSTANTS =require('../../constants');

async function publishOtpSMS(number , otp ) {

        const params = {
            Message:`${CONOSTANTS.APPLICATION_OTP_MSG} ${otp}`,/* required */
            PhoneNumber: `${number}`, //PHONE_NUMBER, in the E.164 phone number structure
           
          };
          try {
            const data = sns_client.send(new PublishCommand(params));

            return data; // For unit tests.
          } catch (err) {
            console.log("Error", err.stack);
          }
              
    }

function subscribeTopic(phoneNum) {
    let params = {
        Protocol: 'SMS', 
        Endpoint: `${phoneNum}`,
        TopicArn: process.env.SMS_SENDER_ARN 
    };

    let subscriber = new EndPoints.PhoneNumberEndPoint(params)

    return sms_sender.subcribe(subscriber) 
 
}

function confirmPhoneNumber( number , otp){
    var params = {
        OneTimePassword: `${otp}`, /* required */
        PhoneNumber: `${number}` /* required */
      };
    
    return  sms_sender.verify(params)

}

 function sendOneTimePasswordToUser(phoneNumber) {
  
    var params = {
        PhoneNumber: phoneNumber, /* required Adds a destination phone number in the SMS Sanbbox*/
        LanguageCode: CONOSTANTS.SMS_LANGUAGES.en_US
        };
    return sns_client.send(new CreateSMSSandboxPhoneNumberCommand(params))
}

async function isSubscribed(phoneNumber){

    let subscribers = await sms_sender.getAllSubscribers()
    subscribers &&= subscribers.Subscriptions 
    let exists = subscribers.some(sub => sub.Endpoint === phoneNumber)
    return Promise.resolve(exists)

}

module.exports = {
    sendOneTimePasswordToUser ,
    publishOtpSMS ,
    subscribeTopic ,
    confirmPhoneNumber,
    isSubscribed 
}
