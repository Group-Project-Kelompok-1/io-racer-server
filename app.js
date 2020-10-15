const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const io = require('socket.io')(http)
const random = require('./helpers/random')

const player = []
let id

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on('connection', (socket) => {
  id = socket.id

  io.emit('GET_RANDOM_QUESTION', random())

  socket.emit('GET_RANDOM_QUESTION', random())

  socket.on('newPlayer', (payload) => {
    player.push({
      id: id,
      nama: payload.name,
      point: payload.point
    })
    console.log(player)
    io.emit('GET_DATA_PLAYER', player)
  })

  socket.on('addPoint', (num) => {
    console.log(num)
  })
})

http.listen(PORT, () => console.log(`listen on ${PORT}`))