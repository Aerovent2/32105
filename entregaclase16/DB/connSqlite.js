import path from  "path"
let ruta =   './DB/ecommerce.sqlite'

const connectionSqlite ={
    client: 'sqlite3',
    connection:{
        filename: ruta
    },
    useNullAsDefault: true
}

export default  connectionSqlite