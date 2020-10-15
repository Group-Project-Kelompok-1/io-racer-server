const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const io = require('socket.io')(http)
const player = []
const random = [37, 38, 39, 40]
let id 

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

io.on('connection', (socket)=>{
  id = socket.id
  console.log(id)
  console.log('a user connected')
  socket.emit('register', {message: 'ini dari server'})

  socket.on('newPlayer', (payload) => {
    player.push(payload)
    io.emit('playerProfile', player)
  })

  socket.on('startGame', () => {
    const i = Math.floor(Math.random()*random.length-1)
    io.emit('gamePlay', random[i])
  })
})

http.listen(PORT, () => console.log(`listen on ${PORT}`))