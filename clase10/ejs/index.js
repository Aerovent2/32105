const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views','./views')
app.set('view engine','ejs')
const personas=[]



app.get('/',(req,res)=>{
   res.render('practico',{personas})
})


app.post('/personas',(req,res)=>{
    const {nombre, apellido,edad}=req.body
    personas.push({nombre, apellido,edad})
    res.status(200).render('practico',{personas})
})




app.get('/index',(req,res)=>{//http://localhost:8080/index/?min=10&nivel=15&max=20&titulo=%3Ci%3Ehola%3C/i%3E
    const {min,nivel,max,titulo}= req.query
    res.render('index', {titulo:'holamundo', contenido:'<h1>Hola Mundo</h1>', min,nivel,max,titulo})
})

app.listen(8080,()=>{
    console.log('iniciando ejs')
})