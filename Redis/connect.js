const redis = require('redis');


// By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port,
// respectively. If you have a different host/port, you can supply them like 
//const client = redis.createClient(port, host)
   
    const client = redis.createClient()
  
    client.connect().then(connection => console.log('Redis connected!'))
    .catch( error => console.log('Redis Client Error', error))
    

  module.exports = client
