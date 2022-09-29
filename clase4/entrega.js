const fs= require('fs')


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

const guardar = async ()=>{
    await prueba.save({title:'Maiz',price: 111,thumbnail: "https//Foto-de-maiz.com"}).then((resultado)=>(console.log(resultado)))
    await prueba.save({title:'Girasol',price: 22,thumbnail: "https//Foto-de-girasol.com"}).then((resultado)=>(console.log(resultado)))
    await prueba.save({title:'Perro',price: 3333,thumbnail: "https//Foto-de-perro.com"}).then((resultado)=>(console.log(resultado)))
}

const buscarId = async ()=>{
    await prueba.getById(8).then((resultado)=>console.log(resultado))
}
const buscarTodos = async ()=>{
    await prueba.getAll().then((resultado)=>console.log(resultado))
}
const borrarId = async ()=>{
    await prueba.deleteById(2)
}
const borrarTodos = async ()=>{
    await prueba.deleteAll() 
}
////////////////////////////////////////////////////////////////////////////////

//guardar()
//buscarId()
//buscarTodos()
//borrarId()
//borrarTodos()