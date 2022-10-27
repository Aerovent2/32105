import mongoose from "mongoose"
import Usuario from "./usuario.js"

(async ()=>{

    //conexion a la base de datos

   try{
       mongoose.connect('mongodb://127.0.0.1:27017/coder',{
           serverSelectionTimeoutMS: 4000,
       })
       console.log('conectado a ala base')
   }
   catch(e){
          console.log(e)
      }


    //create ----------------------------------------------------------------

/*     //metodo 1
     const usuario = new Usuario({nombre:"Eduardo",apellido:"m",edad:23,esEstudiante:true,dni:"10000"})

    await usuario.save()

    //metodo 2
    await Usuario.create({nombre:"Jose",apellido:"Perez",edad:25,esEstudiante:true,dni:"15280"})
 */
    //read ----------------------------------------------------------------
    const lista = await Usuario.find({})
    console.log(lista)

})()

