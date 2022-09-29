class Usuario{
    constructor(nombre,apellido){
        this.nombre=nombre
        this.apellido=apellido
        this.libros = []
        this.mascotas= []
    }
    
    
    getFullName(){
        return ` ${this.nombre} ${this.apellido}`
    }

    addMascotas(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre,autor){
        this.libros.push({
            nombre,
            autor
        })
    }
    getBooksNames(){
        let resultado = this.libros.map(libro => libro.nombre)
        return resultado
    }
}

const persona1 = new Usuario ('Juan', 'Perez')
persona1.addMascotas("michifus")
persona1.addMascotas("firulais")
persona1.addBook('unNombre','unAutor')
persona1.addBook('otroNombre','otroAutor')

console.log(persona1)
console.log(persona1.getBooksNames())
console.log(persona1.countMascotas())
console.log(persona1.getFullName())
