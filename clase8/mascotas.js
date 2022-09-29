const express = require("express");
const{Router}= express;
const router=Router()


const mascotas=[]
router.get('/',(req,res)=>{
    res.send({mascotas})
})

router.post('/',(req,res)=>{
    const {nombre, raza,edad}=req.body
    personas.push(nombre, raza,edad)
    res.send({mascotas})
})

module.exports =router