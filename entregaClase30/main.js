import  express from "express"
import {Server as HTTPServer} from "http"
import {Server as SocketServer} from "socket.io"
import router from "./routers/routes.js"
import session from "express-session"
import sessionOptions from "./sessions/session.js"
import {  DBConnect } from "./dbs/dbUsers.js"
import passport from "./sessions/passport.js"
import ioServer from "./io/io.js"
import * as dotenv from 'dotenv'
import ParseArgs from 'minimist'
import routerRandom from "./routers/routerRandom.js"
import cluster from "cluster"

const{modo}=ParseArgs(process.argv.slice(2))

if(modo === fork){
    
}





dotenv.config()

const app = express()
const httpServer= new HTTPServer(app)
const io = new SocketServer(httpServer)
ioServer(io)

app.use(express.static('views'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions)) 

app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)
app.use('/api',routerRandom)


const{p}=ParseArgs(process.argv.slice(2))


DBConnect(
    httpServer.listen(p??8080, ()=>{console.log(`servidor escuchando en el puerto ${httpServer.address().port}`)})
    
    )



