const express = require("express");
const{Router}= express;
const router=Router()
const multer=require('multer')

const storage = multer.diskStorage({
    filename:(req,res,cb)=>{
        cb(null,file.fieldname)
    },
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    }
})

const upload = multer({storage})


/////////////////////////////////////////////////////////
const middleware=(req,res,next)=>{
    console.log('middleware')
    next()
}
const personas=[]

router.use((req,res,next)=>{
    console.log('activado'+ new Date())
    next()
})

router.get('/',(req,res)=>{
    res.send({personas})
})

router.post('/',middleware,(req,res)=>{
    const {nombre, apellido,edad}=req.body
    personas.push(nombre, apellido,edad)
    res.send({personas})
})

router.post('/subir',upload.single('myfile'),(req,res)=>{
    const {file}=req
    res.send(file)
})

router.post('/album',upload.array('myfile',10),(req,res)=>{
    const {file}=req
    res.send(file)
})
module.exports =router