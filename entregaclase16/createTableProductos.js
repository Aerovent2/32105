import knex from "knex"
import connectionMysql from "../DB/connMysql.js"
const Knex = knex(connectionMysql)


    try{
        await Knex.schema.createTableIfNotExists('productos', table=>{
            table.increments('id')
            table.string('title', 20).notNullable()
            table.float('price').notNullable()
            table.string('thumbnail', 20).notNullable()
        })
        .then(()=>{console.log('tabla Creada')})
    }catch(err){
        console.log(`hubo un error al crear tabla : ${err}`)
        throw err
    } 
