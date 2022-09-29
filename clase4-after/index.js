const fs = require('fs')

class basedeDatos{
    constructor(archivo){
        this.archivo = archivo
        
    }
    async createUser(){
        const data = await fs.promises.readFile
    }
}