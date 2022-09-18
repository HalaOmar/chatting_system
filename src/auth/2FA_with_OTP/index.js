const app = require('./app');


// Simply using this line of code to set a header on your response will enable CORS.


app.use('/api/user' , require('./src/user/webapp/user_router'))

app.listen(process.env.PORT , () =>{
    console.log(`The server listen on port ${process.env.PORT}`);
})