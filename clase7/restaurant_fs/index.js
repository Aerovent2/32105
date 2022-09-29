const express = require("express");
const db = require("./db.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Logger= (req,res,next)=>{
console.log('logued'+ new Date())
next()
}
app.use(Logger)
app.get('/usuario/:id',(req,res)=>{
    //                              params/query
    //http://localhost:8080/usuario/100?pelucas=1&peluches=2
    res.send({metodo:"get", query:req.query, params:req.params})
})

app.post('/usuario',(req,res)=>{
    res.send({metodo:'post', body: req.body.nombre})
})
const frase='Hola mundo como estan'
app.get('/api/frase',(req,res)=>{
   try{
    res.send({frase:frase})
   }catch(e){
    console.log('error'+e)
   }
})
app.get('/api/letras/:num',(req,res)=>{
    try{
     const {num}=req.params
     if(isNaN(parseInt(num))){
       res.status(400).send('no es un numer')
     }else{
        res.send({letra:frase[num-1]}) 
     }
     
    }catch(e){
     console.log('error'+e)
    }
 })
 app.get('/api/palabra/:num',(req,res)=>{
    try{
     const {num}=req.params
     if(parseInt(num)> frase.length){res.status(404).send({error:"numero fuera de rango"})}
     if(isNaN(parseInt(num))){
        res.status(400).send('no es un numer')
      }else{
     const palabra=frase.split(" ")
     res.send(palabra[num-1])
      }
    }catch(e){
     console.log('error'+e)
    }
 })
//////////////

app.get('/api/sumar/:num1/:num2',(req,res)=>{
    try{
     const {num1,num2}=req.params
     const resultado=parseInt(num1)+ parseInt(num2)
     res.send( {resultado:resultado})
      
    }catch(e){
     console.log('error'+e)
    }
 })
 app.get('/api/sumar',(req,res)=>{
   try{
    const {num1,num2}=req.query
    const resultado=parseInt(num1)+ parseInt(num2)
    res.send( {resultado:resultado})
     
   }catch(e){
    console.log('error'+e)
   }
})

 app.get('/api/operacion/:op',(req,res)=>{
    try{
     const {op}=req.params
     const resultado=eval(op)
     res.send( {resultado:resultado})
      
    }catch(e){
     console.log('error'+e)
    }
 })
app.listen('8080',()=>{
    console.log('corriendo')
})