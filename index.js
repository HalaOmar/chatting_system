const express = require('express');
const path = require('path');
const http = require('http');
require('dotenv').config({ path: `${__dirname}/.env` })

require('./Models/connect')

const passport = require('passport');
require('./src/auth/Auth_By_JWT').configurePassport(passport) //configure passport to use jwt Strategy

const pino_http = require('pino-http')
const expressPinoLogger = require('express-pino-logger');

const logger    = require('./logger/pinologger')
const Models    = require('./Models')

const body_parser = require('body-parser')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io         = new Server(server)


app.use(express.static('assets'))

app.use(passport.initialize()) // passport.initialize() will initialize the passport object on every request
app.use(express.json())
app.use((req,res,next) =>{ req.io = io , next() })
app.use('/api/v1/registeration' , require('./src/auth/2FA_with_OTP/auth_user/webapp/auth_user_router'))
app.use('/api/v1/chatLines' , require('./src/chatLines/chatLines_router') )
app.use('/api/v1/chats' , require('./src/chats/chats_router') )
app.use('/api/v1/users' , require('./src/users/user_router'))
// app.use('/api/v1/videochatline' , require('./src'))
// app.use('/api/v1/imagechatline' , require('./src'))
app.use('/mychats' , (req , res , next ) =>{

     res.sendFile(path.join(`${__dirname}/assets/home.html`))
    })

app.use(pino_http( { logger }))
app.use( ( err , req , res , next ) =>{
    logger.error(err)
})


const loggerMidlleware = expressPinoLogger({
    logger: logger,
    autoLogging: true,
  });
  
  app.use(loggerMidlleware);


  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


server.listen(process.env.PORT , ()=>{

    logger.alert(`The server is listening at port ${ process.env.PORT } `)
})
