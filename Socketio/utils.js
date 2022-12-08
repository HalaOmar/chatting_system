const { IoT1ClickDevicesService } = require("aws-sdk")


function addUserToRoom( {socket , username , room , options } ){

    const { error , user } = addUser({id : socket.id , ...options })

        if(error)
        {
            throw new Error("Join Room Failure")
        }
    // join the room
    socket.join(user.room)
    // Wecome the user to the room 
    socket.emit("message" , { message : " Welcome All"})
    // Broadcast an event to every one in the room
    socket.broadcast.to(room).emit("message" , { m : `${user.username} has joined`})
    

}

function removeUserFromRoom( {socket  } ){

    const user = removeUser({id : socket.id })

     if (user ) 
  
    // Broadcast an event to every one in the room
    socket.broadcast.to(user.room).emit("message" , { m : `${user.username} has disconnected`})
    

}

function sendMessageToRoom ( { socket , message }){
    let user

    socket.on("sendLocation" , ( ) =>{
         user = getUser(socket.id)
    })

    socket.broadcast.to(user.room).emit("message" , { m : `${user.username} say ${message}`})
}

function renderUserList ({ io , user }){

    // after auser join or left, the server will emit the roomData to all clients to rerender user list
    io.to(user.room).emit('roomData' , { 
        room : user.room ,
        users : getUsersInRoom(user.room) //getUsersInRoom() to get all users in aspecific room 
    })
}