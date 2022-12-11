import express from 'express'
import {fork} from 'child_process'
import url from 'url'
import { join } from 'path' 
const {Router}= express
const routerRandom=Router()
const __dirname = url.fileURLToPath(new url.URL('.',import.meta.url))
const rutaRandom=join(__dirname,'../workers/generateRandom.js')

routerRandom.get('/', (req,res)=>{
    let cant= req.query.cant?req.query.cant: 100000000  
    if(isNaN(req.query.cant) )cant=100000000 
    const child= fork(rutaRandom)
    child.send({cant})
    child.on('message',msj=>{
      res.send(msj.numeros)
    })
}) 

export default routerRandom