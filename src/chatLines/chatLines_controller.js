
const chatLine_services = require('./chatLines_services')
const s3Uploader = require('../../AWS/s3');

exports.getUserChatLines = async ( req , res ) =>{
   
    try{
        console.log("req.params.chatid" , req.params.chatid)
    let chat_id = req.params.chatid || null 

    let chat_lines = await chatLine_services.getAllChatLinesByChatId(chat_id)
    
    res.json(chat_lines)

    }catch(err){
        res.json(err)
    }

}

exports.addChatLines = async ( req , res ) =>{

    try{

    let chat_line = {
        sender_id : req.user._id || null  ,
        sender : req.body.senderphone || null ,
        chat_id : req.body.chat_id || null  ,
        message : req.body.message || null ,
    }

    if (req.file) {
        chat_line.path = req.file.fname
        const s3_url     = await s3Uploader(req.file.fname)
        chat_line.s3_url = s3_url.Location
    }   
 
        let addOp = await chatLine_services.addChatLine(chat_line)
        console.log(addOp)
        res.json({addOp})

    }catch(err){
        
    }

}

exports.deleteChatLines = ( req , res ) =>{

    let chat_line = {
        user_id : req.body.user_id || null  ,
        chat_id : req.body.chat_id || null  ,
        chatline_id : req.body.chatline_id || null
    }

    try{

    }catch(err){
        
    }

}

exports.messageDeliverd = async ( req , res ) =>{

    let user_id = req.user ? req.user._id : null

   let done = await chatLine_services.messageDelivered(user_id)

   res.json({
    done
   })




}