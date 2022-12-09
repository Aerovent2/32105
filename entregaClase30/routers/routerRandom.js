import express from 'express'
import {fork} from 'child_process'
const {Router}= express
const routerRandom=Router()


routerRandom.get('/randoms', (req,res)=>{
    let cant= req.query.cant?req.query.cant: 100000000  
    if(isNaN(req.query.cant) )cant=100000000 
    const child= fork('../workers/generateRandom.js')
    child.send({cant})
    child.on('message',msj=>{
      res.send(msj.numeros)
    })
}) 

export default routerRandom