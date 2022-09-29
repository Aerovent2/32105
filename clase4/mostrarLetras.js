const mostrarLetras =(palabra,tiempo,cb)=>{
    setTimeout(()=>{
        let i = 0
        const timer = setInterval(()=>{
            console.log(palabra[i])
            i++
            if(i === palabra.length){
                clearInterval(timer)
                cb()
            }
        },1000)
    },tiempo)

}
const fin=()=>{console.log("termine")}
mostrarLetras('pepe',5000,fin)