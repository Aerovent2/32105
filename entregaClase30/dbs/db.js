
export default class baseDeDatos {
    constructor(datos){
        this.datos =datos
    }

    async getAll(){
         try{
           return this.datos
          
        }catch(err){
            console.error(`hubo un error al leer todos : ${err}`)
            throw err
        } 
    }

    async  save(objeto){
        console.log(objeto)
        try{
            this.datos.push(objeto)
        }catch(err){
            console.error(`hubo un error al guardar : ${err}`)
            throw err
        } 
    }
 
}


