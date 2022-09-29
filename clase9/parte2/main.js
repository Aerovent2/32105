const express = require('express');
const fs = require('fs');
const app = express();
const fsPromise =fs.promises;




app.engine('coder',async (filePath, options, callback)=>{
try{
    const {nombre}=options;

    const template = fsPromise.readFile(filePath,'utf-8');

    const rendered = (await template).replace('{{nombre}}',nombre)

    return callback(null,rendered)

}catch(e){
    //return callback(new Error(message:'No encontrado'))
}
})

app.set('views','./views')
app.set('view engine','coder')


app.get('/saludo/:nombre',(req,res)=>{

    const data = {
        nombre:req.params.nombre
    }
    res.render('index',data)
})




app.listen(8080, ()=>{console.log('init')})