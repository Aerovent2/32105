const express = require('express')
const app = express()
const fs= require('fs')

//////////////////////////////////////Clase 4 -Contenedor//////////////////////////////////////////////////////////////// 
class Contenedor {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    async  save(objeto){
        let productos = []
        try{
            let buscarArchivos= await fs.promises.readdir('./')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
                if(existente !== ''){
                     productos = JSON.parse(existente)
                     if(productos.length > 0){
                        let maxId = productos[0].id
                        for(let i =0; i< productos.length; i++){
                            if(maxId < productos[i].id){
                                maxId=productos[i].id
                            }
                        objeto.id = maxId+1
                        }
                     }
                }
            }else{
                objeto.id=1
            }
            productos.push(objeto)
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(productos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer).find(objeto => objeto.id === numero)
            if(encontrado){
                return encontrado
            }else{
                return null
            } 
        }catch(err){
            console.log(`hubo un error al buscar por id : ${err}`)
        } 
    }
    async getAll(){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer)
            if(encontrado){
                return encontrado
            }else{
                return null
            } 
        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
    async deleteById(numero){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer)
            let filtrado = encontrado.filter(objeto => objeto.id !== numero)
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(filtrado))
 
        }catch(err){
            console.log(`hubo un error al borrar por id : ${err}`)
        } 
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreDeArchivo, '')
 
        }catch(err){
            console.log(`hubo un error al borrar todos : ${err}`)
        } 
    }
}

////////////////////////////zona de pruebas////////////////////////////////////
const prueba= new Contenedor('productos.txt')

////////////////////////////////////////////////////////////////////////////////////////////////////// 

app.get('/productos',(req,res)=>{
    try{
      
        prueba.getAll().then((resultado)=>res.send(resultado))
      
    }catch(error){
        console.log(error)
    }
})

app.get('/productoRandom',(req,res)=>{
    try{
        const productoRandom = async ()=>{
            let todos =await prueba.getAll().then((resultado)=>resultado)
            const aleatorio= Math.floor((Math.random() * todos.length+1))
            prueba.getById(aleatorio).then((resultado)=>res.send(resultado))// se podria buscar directo del array [todos] pero quise incluir en metodo getbyID
        }
        
      productoRandom()
    }catch(error){
        console.log(error)
    }
})


const server= app.listen(8080, ()=>{console.log(`servidor escuchando en el puerto${server.address().port}`)})
server.on('error', (error)=>{console.error(error)})