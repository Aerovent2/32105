import  express  from "express"
import {Server as HTTPServer} from "http"
import {Server as SocketServer} from "socket.io"
//import db from './db/db.js'
import connectionSqlite from "./DB/connSqlite.js"
import connectionMysql from "./DB/connMysql.js";
import baseDeDatos from "./dbProd.js"

const app = express()
const httpServer= new HTTPServer(app)
const io = new SocketServer(httpServer)
//const MdB = new db('mensajes.json')

const DB= new baseDeDatos(connectionMysql,'productos')
const MdB =new baseDeDatos(connectionSqlite,'mensajes')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(express.static('views'))



io.on('connection',(socket)=>{
    console.log('nuevo cliente conectado '+ socket.id)
     DB.getAll().then(productos =>{
        socket.emit('productos', productos)
    }) 
     MdB.getAll().then(mensajes=>{
        socket.emit('mensajes',mensajes)
    })
    
    socket.on('new-prod', (data)=>{
        DB.save(data)
        
         DB.getAll().then(productos =>{
            io.sockets.emit('productos', productos)
        }) 
    
    }) 
    socket.on('new-msj', (data)=>{
        MdB.save(data)
        MdB.getAll().then(mensajes=>{
            io.sockets.emit('mensajes',mensajes)
        })
    }) 
})



httpServer.listen(8080, ()=>{console.log(`servidor escuchando en el puerto ${httpServer.address().port}`)})
httpServer.on('error', (error)=>{console.error(error)})