const models = require('../../Models');
const Chat_Line = models.ChatLine

exports.addChatLine = ( chat_line ) =>{
 const cl = new Chat_Line(chat_line)
 return cl.save()
}

exports.deleteChatLine = ( cl) =>{
 return Chat_Line.deleteOne( cl )
}

exports.getAllChatLines = ( chat_id ) =>{

    return Chat_Line.find({
        chat_id
    })

}

exports.getAllChatLineReplys = ( cl_id ) => {

    return Chat_Line()

}

exports.updateChatLineToDelivered = async (update_criteria , deliveredTo) =>{

    console.log( "update_criteria" , update_criteria , deliveredTo )

    return Chat_Line.updateMany(
        {   chat_id : update_criteria.chat_id ,
            _id     : {
                $in : update_criteria.chat_lines_ids
            } ,          
            "message_info.Delivered.to" : {
                
                   $nin : [deliveredTo.user_id]          //If the field holds an array, 
                                                        //then the $nin operator selects 
                                                        //the documents whose field holds
                                                        // an array with no element equal
                                                        // to a value in the specified array.                                          
            }
            } , 
        {
            $push:{     
                "message_info.Delivered" : {
                    to : deliveredTo.user_id , 
                    at : Date.now()} }
        }
        
    )
}


// > db.demo366.find(
//     ...    {"$expr":{
//     ...       "$let":{
//     ...          "vars":{
//     ...             "john2":{"$arrayElemAt":["$details",{"$indexOfArray":["$details.Id","John2"]}]},
//     ...             "john3":{"$arrayElemAt":["$details",{"$indexOfArray":["$details.Id","John3"]}]}
//     ...    },
//     ...    "in":{"$lt":["$$john2.value","$$john3.value"]}
// }
//     ... }})