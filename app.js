const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

io.on('connection', (socket)=>{
  console.log('a user connected')
})

http.listen(PORT, () => console.log(`listen on ${PORT}`))