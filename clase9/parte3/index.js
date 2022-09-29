const express = require('express')
const handlebars =require('express-handlebars')
const app = express()

app.engine('hbs',handlebars.engine({
    extname:'.hbs',
    layoutsDir:__dirname+'/views',
    defaultLayout:'main.hbs'
    
}))

app.set('views','./views');
app.set('view engine', 'hbs')

app.get('/hbs',(req,res)=>{
    res.render('main',{
        layout:'main',
        nombre:'alejandro',
        saludo:'hola man',
        compras:['manzana','pera','aguacate']
    })
})

app.listen(8080, ()=>{console.log('init')})