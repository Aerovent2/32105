import knex from "knex";
import connection from './db.js'
const Knex = knex(connection)

Knex.schema.createTable('usuarios', tabla=>{
    tabla.increments('id')
    tabla.string('nombre')
    tabla.string('apellido')
    tabla.string('correo')
    tabla.integer('rango')
}).then(()=>{console.log('tabla creada')})
.catch((e)=>{console.log(e); throw e})
.finally(()=>{Knex.destroy()})