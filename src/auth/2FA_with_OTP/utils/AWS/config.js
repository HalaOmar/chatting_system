const {Credentials , Config } = require('aws-sdk');
// the AWS credentials to sign requests with.
const myCredentials =  new Credentials({
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
                        sessionToken: process.env.AWS_SESSION_TOKEN
                    })

const myConfig      =  new Config({
                        credentials: myCredentials,
                        region: 'me-south-1',
                        maxRetries : 100 , 
                        maxRedirects : 10,
                        logger : null 
                    });


module.exports      = myConfig