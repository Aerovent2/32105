const express=require('express')
const {Server:HTTPServer}=require('http')
const {Server:SocketServer}=require('socket.io')

const app = express()
const httpServer= new HTTPServer(app)
const io = new SocketServer(httpServer)

const Mensajes= [{autor:'jose',msj:'hola Mundo'},{autor:'pepe',msj:'hola Mundo'},{autor:'juanito',msj:'hola Mundo'},{autor:'maria',msj:'hola Mundo'}]
app.use(express.static('views'))

io.on('connection',(socket)=>{
    console.log('nuevo cliente conectado '+ socket.id)
    socket.emit('mensajes', Mensajes)
    socket.on('new-msg', (data)=>{
        Mensajes.push(data)
        io.sockets.emit('mensajes', Mensajes)
    })
})


httpServer.listen(8080, ()=>{console.log('servidor escuchando en puerto 8080')})