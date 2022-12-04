import  express from "express"
import {Server as HTTPServer} from "http"
import {Server as SocketServer} from "socket.io"
import dbProd from "./dbProds.js"
import dbMsg from "./dbMsg.js"
import {normalize,schema} from 'normalizr'
import router from "./routes.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import {  DBConnect } from "./dbUsers.js"
import passport from "./passport.js"
import * as dotenv from 'dotenv'
import ParseArgs from 'minimist'
import routerRandom from "./routerRandom.js"


dotenv.config()


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
    secret:process.env.SECRET_SESSION,
    resave:true,
    rolling:true, //resetea el tiempo de expiracion al tener session activa
    saveUninitialized:false,
    cookie:{maxAge:600000},//expira en 10 min si no hay actividad
    store: MongoStore.create({
        mongoUrl:process.env.DB_SESION,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
    })
})) 

app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)
app.use('/api',routerRandom)

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
const{p}=ParseArgs(process.argv.slice(2))

DBConnect(
    httpServer.listen(p??8080, ()=>{console.log(`servidor escuchando en el puerto ${httpServer.address().port}`)})

)
