
class ServiceObject{
    constructor(protocol , TopicARN){
        this.Protocol = protocol
        this.TopicArn = TopicARN

    }
}

class PhoneNumberEndPoint extends ServiceObject{
    constructor(params){  
        let {Protocol , TopicArn } = params
        super(Protocol , TopicArn)     
        this.Endpoint = params.Endpoint
        
    }

}

class EmailEndPoint extends ServiceObject {
    constructor(params){
        let {Protocol , TopicArn } = params
        super(Protocol , TopicArn)     
        this.Endpoint = params.Endpoint
    }
    
}

class ApplicationEndPoint extends ServiceObject{
    constructor(params){
        let {Protocol , TopicArn } = params
        super(Protocol , TopicArn)  
        this.Endpoint = params.MOBILE_ENDPOINT_ARN

    }
    
}

module.exports = {
    PhoneNumberEndPoint ,
    EmailEndPoint , 
    ApplicationEndPoint
}