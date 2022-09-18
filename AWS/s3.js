const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region :'us-east-1'
});


const uploadFileToS3 = (fileName) => {
 const filestream =  fs.createReadStream(`images/${fileName}`)
  
     const params = {
         Bucket: process.env.AWS_S3_BUCKET_NAME, // pass your bucket name
         Key: fileName , // file will be saved as testBucket/contacts.csv
         Body: filestream
     };
    return  s3.upload(params).promise()
    }

module.exports =  uploadFileToS3