
process.on('message',msj=>{
    let numeros={}
    let cant= msj.cant
    while(cant>0){
        const random =Math.floor(Math.random() * 1000);
        if(!numeros[random]){
            numeros[random]=0
        }
        numeros[random]++
        cant--
    }
    process.send({numeros})
})