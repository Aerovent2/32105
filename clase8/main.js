const express = require("express");
const app = express();
const personasRouter= require('./personas')
const mascotasRouter= require('./mascotas')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/personas',personasRouter)
app.use('/mascotas',mascotasRouter)

app.use(express.static('public'))
app.use('/',express.static(__dirname +'/public'))


app.listen('8080',()=>{
    console.log('corriendo')
})