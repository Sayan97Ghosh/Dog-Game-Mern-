const express = require('express');
const cors = require("cors");
const { userRouter } = require('./router/User.route');
const { connection } = require('./connection/db');
const { likeRouter } = require('./router/Like.route');

require("dotenv").config();
const app = express();
app.use(cors())

app.use(express.json());

app.use("/", userRouter);

app.use("/like", likeRouter);


app.listen(1234, async ()=>{
    try{
        await connection;
        console.log("connection successful!")
    }catch(err){
        console.log("connection failed")
    }

    console.log(`server listen on port 1234`)
})