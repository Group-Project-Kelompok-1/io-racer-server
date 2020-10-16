const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const io = require('socket.io')(http)
let player = []
const random = [37, 38, 39, 40, 37, 38, 39, 40, 37, 38, 39, 40]
let id 
const emot = ['→','↓','←','↑','→','↓','←','↑','→','↓','←','↑']

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

io.on('connection', (socket)=>{
  // console.log(socket.conn.server)
  console.log('a user connected')
  socket.emit('register', {message: 'ini dari server'})

  socket.on('newPlayer', (payload) => {
    payload.userID = socket.id
    player.push(payload)
    // console.log(player)
    io.emit('playerProfile', player)
  })

  socket.on('startGame', () => {
    const i = Math.abs(Math.floor(Math.random()*random.length-1))
    const payload = { keycode: random[i], emot: emot[i]}
    io.emit('gamePlay', payload)
  })

  socket.on('addPoint', () => {
    let gameover = false
    id = socket.id
    player.forEach(user => {
      if (user.userID === id) {
        user.point ++
        if(user.point >= 5){
          console.log('udah lima')
          io.emit('gameOver', user.name)
          player = []
          gameover = true
        }
      } else {
        user.point --
      }
    })

    if (!gameover) {
      const i = Math.abs(Math.floor(Math.random()*random.length-1))
      const payload = { keycode: random[i], emot: emot[i]}
      io.emit('gamePlay', payload)
      io.emit('serverPlayers', player)
    }
    console.log(player)
    
  })

})

http.listen(PORT, () => console.log(`listen on ${PORT}`))