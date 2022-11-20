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
import passport from "passport"
import {Strategy} from 'passport-local'
import { DBConnect, Users } from "./dbUsers.js"
import bcrypt from 'bcrypt'


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

passport.use('register', new Strategy({passReqToCallback:true},
    (req,username,password, done)=>{
        const {email}=req.body
        Users.findOne({username},(err,user)=>{
            if(user) return done(null,false)
            let hashPass= bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            Users.create({username,password:hashPass,email},(err,user)=>{
                if(err) return done(err)
                return done(null,user)
            })
        })
    }
))

passport.use('login', new Strategy({},
    (username,password, done)=>{
        Users.findOne({username},(err,user)=>{
            if(err) return done(err)
            if(!user) return done(null,false)
            bcrypt.compareSync(password,user.password)? done(null,user): done(null,false)           
        })
    }
))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    Users.findById(id,done)
})

app.use(passport.initialize())
app.use(passport.session())

const __dirname = url.fileURLToPath(new url.URL('.',import.meta.url))
const rutaProdHtml=join(__dirname,"views/products.html")
const rutaLogin =join(__dirname,"views/login.html")
const rutaRegister =join(__dirname,"views/register.html")
const rutaRegisterError =join(__dirname,"views/registerError.html")
const rutaLoginError =join(__dirname,"views/loginError.html")

const auth = (req,res,next)=>{
 req.isAuthenticated()? next(): res.redirect('/login')
}


app.get('/',auth,(req,res)=>{
    res.redirect("/productos")
})

app.get('/login', (req,res)=>{
    res.sendFile(rutaLogin)
}) 
app.post('/',passport.authenticate('login',{failureRedirect:'/loginError'}),(req,res)=>{
    res.redirect('/productos')
})

app.get('/register', (req,res)=>{
    res.sendFile(rutaRegister)
}) 

app.post('/register', passport.authenticate('register',{failureRedirect:'/registerError'}),(req,res)=>{
    res.redirect('/productos')
})

app.get('/productos',auth,  (req,res)=>{
    
    res.sendFile(rutaProdHtml)
}) 
app.get('/loginError',  (req,res)=>{
    res.sendFile(rutaLoginError)
}) 
app.get('/registerError',  (req,res)=>{
    res.sendFile(rutaRegisterError)
})

app.get('/user',auth, (req,res)=>{
    
    res.send({usuario:req.user.username})
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


DBConnect(
    httpServer.listen(8080, ()=>{console.log(`servidor escuchando en el puerto ${httpServer.address().port}`)})

)
