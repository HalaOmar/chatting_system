const multer = require('multer');
const path   = require('path')

const imageStorage = multer.diskStorage(
    {
        destination : "images",
        filename    : (req , file , cb )=>{
            let filename = file.fieldname+'_'+Date.now()+ path.extname(file.originalname)
            file.fname    = filename
            cb(null , filename )

        }
    }
)

const imageUploader = multer({
    storage : imageStorage , 
    limits  :{
        fileSize : 10000000
    } ,
    fileFilter(req , file , cb){

        console.log("file.originalname",file.originalname.match(/\.(png|jpg)$/))
        if ( !file.originalname.match(/\.(png|jpg)$/))
        return cb(new Error('Please upload a image'))

        cb(null , true )
    }

})

module.exports = imageUploader