const fs = require('fs')
const logger = require('../logger/pinologger')


let files , models = { }

try{

     files = fs.readdirSync(`${__dirname}`)
     
     let files_name = files.map( file =>

         {
             
             let model_name 
             model_name = file.slice( 0, file.indexOf('.')) 
             models[model_name] = require(`${__dirname}/${file}`) 
                      
         }
         
         )

}catch(err){
    console.error(err)

}


delete models.index

module.exports = models