import  express, { text }  from "express"
import {Server as HTTPServer} from "http"
import {Server as SocketServer} from "socket.io"
import dbProd from "./dbProds.js"
import dbMsg from "./dbMsg.js"
const app = express()
const httpServer= new HTTPServer(app)
const io = new SocketServer(httpServer)
import {normalize,schema} from 'normalizr'
//import util from 'util'

const DB= new dbProd()
const MdB =new dbMsg()

const messageSchema = new schema.Entity('mensajes')
const authorSchema= new schema.Entity('autores')


const mySchema = [
    {   
        'text':[messageSchema],
        "author":authorSchema,
    }
]







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(express.static('views'))







 app.get('/api/productos-test',async (req,res)=>{
    await DB.getAll().then(productos =>{res.send(productos)})
    
}) 


io.on('connection',(socket)=>{
    console.log('nuevo cliente conectado '+ socket.id)
     DB.getAll().then(productos =>{
        socket.emit('productos', productos)
    })  
       MdB.getAll().then(mensajes=>{
        
        
        let normalizado =normalize(mensajes, mySchema)
        
        //console.log(util.inspect(normalizado,false,13,true))

        socket.emit('mensajes',normalizado)
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
            let normalizado =normalize(mensajes, mySchema)
            io.sockets.emit('mensajes',normalizado)
        })  
    }) 
})



httpServer.listen(8080, ()=>{console.log(`servidor escuchando en el puerto ${httpServer.address().port}`)})
httpServer.on('error', (error)=>{console.error(error)})