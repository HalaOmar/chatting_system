
const chatLine_services = require('./chatLines_services')
const s3Uploader = require('../../AWS/s3');

exports.getUserChatLines = async ( req , res ) => {

    // Express allows you to use either one. For restful parameters that are in the path of the URL
    // , you use the :id syntax and you access the value in req.params.id
    // For query parameters, you don't define them in the express route path. Instead,
    // Express parses any query parameters that exist on any route and makes them available in req.query.
    
    try{

    let chat_id = req.query.chatid || null 

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

exports.deleteChatLines = async  ( req , res ) =>{
        
    let chat_line = {
        user_id : req.user._id || null  ,
        chat_id : req.body.chat_id || null  ,
        chatline_id : req.body.chatline_id || null
    }

    try{

        let delOp = await chatLine_services.deleteChatLine(chat_line)
        res.json(delOp)
        
    }catch(err){
        res.json(err)
           }

}

exports.messageDeliverd = async ( req , res ) =>{

    let user_id = req.user ? req.user._id : null

   let done = await chatLine_services.messageDelivered(user_id)

   res.json({
    done
   })




}