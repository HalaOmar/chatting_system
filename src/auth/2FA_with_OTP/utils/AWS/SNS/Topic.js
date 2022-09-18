const {
       SNSClient ,
       ListSubscriptionsByTopicCommand,
       SubscribeCommand,
       VerifySMSSandboxPhoneNumberCommand } =require ("@aws-sdk/client-sns");

const config = require('../config')


class Topic{

    snsClient = new SNSClient(config);
    created   = true

    constructor( name , Arn ){
        this.name = name
        this.Arn  = Arn 
        !this.created ? this.run(name) : ''
    }

     run = async () => {
        const params = { Name: `${this.name}` }; //TOPIC_NAME
        try {
          const data = await this.snsClient.send(new CreateTopicCommand(params));
          return data; // For unit tests.
        } catch (err) {
          throw err
        }
      };

    getAllSubscribers(){
        const params = { TopicArn: this.Arn }; //TOPIC_ARN
        try {
            const data = this.snsClient.send(new ListSubscriptionsByTopicCommand(params));
            return data; // For unit tests.
          } catch (err) {
            console.log("Error", err.stack);
          }
    }

    subcribe(params){
       
        try {
            const data = this.snsClient.send(new SubscribeCommand(params));
            return data; // For unit tests.
          } catch (err) {
            throw err
          }
    }

    verify(params){

      try{
        const data = this.snsClient.send(new VerifySMSSandboxPhoneNumberCommand(params))
        return data

      }catch(e){

      }

    }

}

module.exports = Topic