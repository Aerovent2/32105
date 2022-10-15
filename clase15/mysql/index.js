import knex from "knex";
import connection from './db.js'
const Knex = knex(connection)

const usuario = {
    nombre:'sebastian2',
    apellido:'ortega',
    correo: 'sebas@fmaic.omc',
    rango:1
}

Knex('usuarios')
                .insert(usuario)
                .then(()=>{console.log(usuario)})
                .catch((e)=>{console.log(e) })
                .finally(()=>Knex.destroy())