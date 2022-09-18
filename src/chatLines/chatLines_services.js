
const { default: mongoose } = require('mongoose')
const chat_line_dao = require('./chatLines_dao')
const chats_services = require('../chats/chats_services')

const client = require('../../Redis/connect')
const { collection } = require('../../Models/Users')

exports.addChatLine = (chat_line) => {
   console.log("chat_line" , chat_line )
   return chat_line_dao.addChatLine(chat_line)

}


exports.deleteChatLine = (cl_id ) =>{

    return chat_line_dao.deleteChatLine(cl_id)

}

exports.getAllChatLinesByChatId = async ( chat_id ) =>{

    try {
        let chat_lines
        let ch_id = mongoose.Types.ObjectId(chat_id)
        // let cachedchatlines = await client.get(`${chat_id}`)
        // await client.del(`${chat_id}`)
        // console.log("cachedchatlines" , cachedchatlines)
        
        // cachedchatlines.length ? chat_lines  = JSON.parse(cachedchatlines) : (

                          chat_lines = await chat_line_dao.getAllChatLines(ch_id)
                          
                        //   ,client.set(`${chat_id}` , `${JSON.stringify(chat_lines)}`)   
                          
                        //   )

        return Promise.resolve(chat_lines)

    } catch (error) {

        return error
        
    }

}

exports.messageDelivered = async ( user_id ) =>{

    try {
        // at first get all chats that this user_id is member of it
        console.log('user_id :>> ', user_id);
        let chats = await chats_services.getAllUserChats(user_id)
        // then get all chatLines of this chat and updates its info as deliverd 
        console.log('chats :>> ', chats);
        chats.map( async chat =>{

            let user_chat_lins = await this.getAllChatLinesByChatId(chat._id)

            let chat_lines_ids = user_chat_lins.map( chat_line => chat_line._id)

            let result = await chat_line_dao.updateChatLineToDelivered( { chat_id : chat._id,
                                                              chat_lines_ids} , { user_id } )

        })
        
    } catch (error) {
        throw error
    }
}