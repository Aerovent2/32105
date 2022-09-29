const express= require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const palabras = ['Frase','Inicial']

app.get('/api/frase',(req,res)=>{
    res.send({frase: palabras.join(' ')})
})

app.get('/api/palabras/:pos',(req,res)=>{
    const  {pos}= req.params
    res.send({buscada : palabras[pos -1]})
})

app.post('/api/palabras',(req,res)=>{
    const {palabra}= req.body
    palabras.push(palabra)
    res.send({agregada:palabra, pos:palabras.length})
})

app.put('/api/palabras/:pos',(req,res)=>{
    const {palabra}= req.body
    console.log(palabra)
    const {pos}= req.params
    console.log(pos)
    const anterior= palabras[pos-1]
    palabras[pos-1]=palabra
    res.send({actualizada:palabra, anterior})
})

app.delete('/api/palabras/:pos',(req,res)=>{
    const {pos}= req.params
    palabras.splice(pos-1,1)
    console.log(palabras)
    res.send({'eliminado':'ok'})
})

app.listen(8080,()=>{
    console.log('iniciando')
})