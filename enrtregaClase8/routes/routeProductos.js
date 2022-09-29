const express=require('express')
const {Router}= express
const router=Router()
const db= require('../db/dbProductos')
const DB= new db()


router.get('/', async(req,res)=>{
    try{
       const data = await DB.getAll()
       return res.status(200).send(data)
    }catch(err){
        res.status(400).send({error:err})
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const {id}=req.params
        const data = await DB.getById(id)
        if(data){
           res.status(200).send(data)  
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
    }catch(err){
        res.status(404).send({error:err})
    }
})

router.post('/', async(req,res)=>{
    const producto=req.body
    try{
       const data = await DB.save(producto)
       producto.id = data
       res.send(producto)
    }catch(err){
        res.send({error: true, err})
    }
})
router.put('/:id', async(req,res)=>{
    const producto=req.body
    const {id}=req.params
    try{
       const data = await DB.updateById(id,producto)
       if(data){
        res.status(200).send(data)
     }else{
         res.status(404).send({error:'producto no encontrado'})
     }
    }catch(err){
        res.send({error: true, err})
    }
})

router.delete('/:id', async(req,res)=>{
    const {id}=req.params
    try{
       const data = await DB.deleteById(id)
       if(data){
        res.status(200).send(data)
     }else{
         res.status(404).send({error:'producto no encontrado'})
     }
    }catch(err){
        res.send({error: true, err})
    }
})


module.exports = router