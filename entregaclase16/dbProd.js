import knex from "knex";

export default class baseDeDatos {
    constructor(connection, table){
        this.Knex = knex(connection)
        this.table= table
    }

    async getAll(){
         try{
           return await this.Knex.select('*').from(this.table)
          
        }catch(err){
            console.error(`hubo un error al leer todos : ${err}`)
            throw err
        } 
    }

    async  save(objeto){
        try{
            await this.Knex(this.table).insert(objeto)
            .then((id)=>{return id })
        }catch(err){
            console.error(`hubo un error al guardar : ${err}`)
            throw err
        } 
    }
 
}


