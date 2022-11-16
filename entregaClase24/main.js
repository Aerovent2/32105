import  express from "express"
import {Server as HTTPServer} from "http"
import {Server as SocketServer} from "socket.io"
import dbProd from "./dbProds.js"
import dbMsg from "./dbMsg.js"
import {normalize,schema} from 'normalizr'
import url from 'url'
import { join } from 'path' 
import session from "express-session"
import MongoStore from "connect-mongo"



const app = express()
const httpServer= new HTTPServer(app)
const io = new SocketServer(httpServer)

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

app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:'passwordSupersecreta',
    resave:true,
    rolling:true, //resetea el tiempo de expiracion al tener session activa
    saveUninitialized:false,
    cookie:{maxAge:600000},//expira en 10 min si no hay actividad
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://Aerovent2:PmslOif8zFcPUMEO@cluster0.ukiygmp.mongodb.net/sessions",
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    })
})) 



const __dirname = url.fileURLToPath(new url.URL('.',import.meta.url))
const rutaProdHtml=join(__dirname,"views/products.html")
const rutaLogin =join(__dirname,"views/login.html")


const auth = (req,res,next)=>{
    if(req.session.usuario) {
        next()
    }else{
        res.status(401).redirect('/login')
    }
}


app.get('/', (req,res)=>{
    if(req.session.usuario){
        res.redirect('/productos')
    } else{
     res.redirect('/login')   
    }
    
}) 

app.post('/', (req,res)=>{
    const {username}= req.body
        req.session.usuario=username
        res.redirect('/productos')
}) 

app.get('/login', (req,res)=>{
    res.sendFile(rutaLogin)
}) 

app.get('/productos',auth,  (req,res)=>{
    
        res.sendFile(rutaProdHtml)
}) 

app.get('/user',auth, (req,res)=>{
    res.send({nombre:req.session.usuario})
}) 



app.get('/logout', (req,res)=>{
    req.session.destroy()
    res.redirect("/")
}) 


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