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
import { cpus } from "os"

const{modo}=ParseArgs(process.argv.slice(2))
const PORT = process.argv[2] || 8080

const serverExpress = ()=>{
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

    DBConnect()
    httpServer.listen(PORT, ()=>{console.log(`servidor con pid ${process.pid} escuchando en el puerto ${httpServer.address().port}`)})

}


    if(modo === 'cluster'){
        if(cluster.isPrimary){
            for(let i =0; i<3/* cpus().length */;i++){// Si le pongo todos los nucleos me crashea mongo atlas
                cluster.fork()
            }
            console.log(`primary pid ${process.pid}`)
            cluster.on('exit',(worker,code,signal)=>{
                console.log(`Worker with id ${worker.process.pid} Killed`)
                cluster.fork()
            })
        }else{
           serverExpress()
        }
    }else{
        serverExpress()
    }
    


