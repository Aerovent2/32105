const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views','./views')
app.set('view engine','pug')

app.get('/main/:nombre',(req,res)=>{
    const {nombre}=req.params
    res.render('index',{nombre,usuarios:['pepe','juanito'], isLogged:true})
})


app.get('/hola',(req,res)=>{
    
    res.render('vista2')
})

app.get('/datos',(req,res)=>{//http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=%3Ci%3Ehola%3C/i%3E
    const {min,nivel,max,titulo}= req.query
    
    res.render('desafio',{min,nivel,max,titulo})
})
app.listen(8080,()=>{
    console.log('iniciando pug')
})