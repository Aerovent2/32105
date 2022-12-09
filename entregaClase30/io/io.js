import dbProd from "../dbs/dbProds.js"
import dbMsg from "../dbs/dbMsg.js"
import {normalize} from 'normalizr'
import mySchema from "../normalize/normailize.js"



const ioServer=(io)=>{
    
    const DB= new dbProd()
    const MdB =new dbMsg()
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


}



export default ioServer