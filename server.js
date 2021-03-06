const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const Message = require('./models/Message')
const User = require('./models/User')


const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error=>console.log(error))
db.on('open', ()=>console.log('Connected to database...'))

app.use(bodyParser.json()) //this is needed so that making post requests using fetch won't result in the body being empty 
// app.use(express.urlencoded())



app.get('/messages', (req, res)=>{
    Message.find().exec((err, messages)=>{
        if(err){
            res.json({message:"Whoops, something went wrong"})
        }
        res.json({messages})
    })
})

io.on('connection', socket=>{
    console.log('a user connected')
    socket.on('chat message', newMessage=>{
        const message = new Message(newMessage)
        try{
            message.save()
            socket.broadcast.emit('chat message', message)
            console.log(newMessage)
        }catch(e){
            socket.emit('chat message error')
        }

    })
})



const PORT = process.env.PORT || 5000
http.listen(PORT, ()=>console.log(`Server listening on port ${PORT} `))