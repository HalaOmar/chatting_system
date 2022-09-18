const axios = require('axios');

class AWS {
    constructor(){

    }
}

class VerifySMSOTP {
    constructor(urlAnatomy){
        this.protocol = urlAnatomy.protocol 
        this.domain   = urlAnatomy.domain
        this.method   = urlAnatomy.method
        this.queryString = {...urlAnatomy.queryString}
    }

    getQueryString(){

        let namevalueQuery = ``

        let key_values = Object.entries(this.queryString)
        let next = 0 
        key_values.forEach(([key,value]) =>{
            namevalueQuery+=`${key}=${value}${next<key_values.length?'&':''}`
            next++
        })
        console.log('namevalueQuery :>> ', namevalueQuery);

        return namevalueQuery

    }

    callAPI(){

        let URI = `${this.protocol}://${this.domain}?${this.getQueryString()}`
        let { method  = this.method} = axios
        console.log('method :>> ', this.method , method);
        return axios.get(URI , this.headers())
       
    }

    headers(){
      let  authorization_header = 'Credential=' + process.env.AWS_ACCESS_KEY_ID
      let headers = {'Authorization':authorization_header} 
      return headers
    }

}    

module.exports = {
    VerifySMSOTP
}