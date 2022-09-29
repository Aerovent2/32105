
//callbacks-----------------------------------------------------------
//ejemplo 1
function logger(msg){
    const ahora = new Date();
    console.log(msg,ahora)
}

//ejemplo2

function obtenerUsuarios(nombre,cb){
    setTimeout(()=>{
        cb({nombre, edad:22, estudiante:true})
    },1)
}
obtenerUsuarios('pepe',logger)


const operacion = (num1, num2, cb) => cb(num1,num2)

const suma = (num1, num2)=> num1 + num2

const resta = function(a, b){
    return a-b
}
const multiplicacion = (a,b)=>{
    return a*b
}

const division = (a,b)=>a/b

console.log(operacion(8,4,multiplicacion))
//---------------------------------------------------------------------

//Promesas------------------------------------------------------------
//Ejemplo1
function esEstudiante(nombre){
    return new Promise((resolve, reject)=>{
        const usuario={
            nombre,
            esEstudiante: true
        }
        if(usuario.esEstudiante==true){
            resolve(usuario)
        }else{
            reject('el estudiante no es usuario')
        }
    })
}

esEstudiante('carlos')
.then(resultado=>{
    console.log(resultado)
})
.catch(error=>{
    console.log(error)
})

//Ejemplo2
function dividir(a,b){
    return new Promise((resolve, reject)=>{
        if(b==0){
            reject('no se puede dividir por cero')
        }else{
            resolve(a/b)
        }
    })
}
dividir(10,0)
.then(resultado => console.log(resultado))
.catch(error =>{
    console.error(error)
})

//Sincronismo y Asincronismo--------------------------------------------------------------
//Ejemplo 1
