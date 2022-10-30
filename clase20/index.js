import mongoose from "mongoose";
import Usuario from "./usuario.js"


(async ()=>{
    try{
        await mongoose.connect("mongodb+srv://Aerovent2:PmslOif8zFcPUMEO@cluster0.ukiygmp.mongodb.net/test",{
            serverSelectionTimeoutMS:5000
        })
        console.log("conectado a la base de mongo Atlas")
    }catch (e){
        console.log('error en conexion MongoAtlas',e)
    }
    //Guardar 1
/*     const usuario = new Usuario({
        nombre: "Federico",
        apellido: "Perez",
        dni: "10000000",
      });
      await usuario.save(); */

     //Guardar Varios 
    /*  await Usuario.insertMany([{
        nombre: "Lucas",
        apellido: "Muños",
        dni: "1545000",
      },{
        nombre: "Maria",
        apellido: "Gonzalez",
        dni: "105435000",
      },{
        nombre: "Carlos",
        apellido: "Arrua",
        dni: "23400000",
      }]) */
})()