const multer = require('multer');
const path   = require('path')
const videoStorage = multer.diskStorage(
    {
        destination : "videos",
        filename    : (req , file , cb )=>{
            let filename = req.user.phoneNumber+'_'+Date.now()+ path.extname(file.originalname)
            file.fname    = filename
            cb(null , filename)

        }
    }
)

const videoUploader = multer({
    storage : videoStorage , 
    limits  :{
        fileSize : 10000000
    } ,
    fileFilter(req , file , cb){
        if ( !file.originalname.match(/\.(mp4|MPEG-4|mkv)$/))
        return cb(new Error('Please upload a image'))

        cb(null , true )
    }

})

module.exports = videoUploader