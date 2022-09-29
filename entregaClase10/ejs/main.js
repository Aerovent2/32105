const express = require('express')
const app= express()
const productosRouter= require('./routes/routeProductos')



app.set('views','./views');
app.set('view engine', 'ejs')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/',productosRouter)


const server = app.listen(8080, ()=>{console.log(`servidor escuchando en el puerto ${server.address().port}`)})
server.on('error', (error)=>{console.error(error)})