import knex from "knex"
import connectionSqlite from "./DB/connSqlite.js"
const Knex = knex(connectionSqlite)


    try{
       
      
       await Knex.schema.createTableIfNotExists('mensajes', table=>{
            table.increments('id')
            table.string('email').notNullable()
            table.string('mensaje')
            table.string('fyh')
        })
        .then(()=>{console.log('tabla Creada')})
        .then (()=>{Knex.destroy()})  
    }catch(err){
        console.log(`hubo un error al crear tabla : ${err}`)
        throw err
    } 
