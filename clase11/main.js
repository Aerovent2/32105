const {Server: HttpServer}= require('http')
const express = require('express')
const {Server: SocketServer}= require('socket.io')
const app =express()

const httpServer=new  HttpServer(app)
const io= new SocketServer(httpServer)

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})

httpServer.listen(8080,()=>{console.log('conectado en puerto 8080')})


const mensajes=[]
io.on('connection',(socket)=>{
    console.log('¡Nuevo cliente conectado!')
    socket.emit('mensajes',mensajes)
    socket.on('mensaje', (data)=>{
        mensajes.push({socketId:socket.id, mensaje:data})
        io.sockets.emit('mensajes',mensajes)
    })
})