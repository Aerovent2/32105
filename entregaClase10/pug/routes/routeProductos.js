const express=require('express')
const {Router}= express
const router=Router()
const db= require('../db/dbProductos')
const DB= new db()



router.get('/',(req,res)=>{
    try{
        res.render('main')
            
    }catch(err){
        res.status(400).send({error:err})
    }
})


router.get('/productos', async(req,res)=>{
    try{
       const productos = await DB.getAll()
       return res.render('products.pug', {productos})
    }catch(err){
        res.status(400).send({error:err})
    }
})


router.post('/productos', async(req,res)=>{
    const producto=req.body
    
    try{
       await DB.save(producto)
       res.redirect('/')
    }catch(err){
        res.send({error: true, err})
    }
})



module.exports = router