/* function aleatorio(valorMax, cantidad){
    const obj={}
    for(let i =0;i<cantidad;i++){
        let aleatorio =Math.floor((Math.random()*valorMax )+1)
        if(!obj[aleatorio]){
            obj[aleatorio]=0
         }
        obj[aleatorio]++
    }
    return obj
}
console.log(aleatorio(20,1000)) */

const moment = require('moment')

const hoy = moment()
const nacimiento= moment("19/12/1987","DD/MM/YYYY")

const anios= hoy.diff(nacimiento,"years")
const dias= hoy.diff(nacimiento,"days")

console.log(`hoy es ${hoy.format("DD/MM/YYYY")}`)
console.log(`tengo ${anios} años`)
console.log(`tengo ${dias} dias`)