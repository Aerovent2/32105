    import mongoose from "mongoose"
    // schema 
    const usuarioSchemma = new mongoose.Schema({
        nombre: {type: String, required: true},
        apellido:{type: String,required: true },
        edad:{type: Number,required:true},
        esEstudiante:{type: Boolean, default:true},
        dni:{type:String, required:true,unique:true}
    })
    //modelo 
    const Usuario = mongoose.model('usuarios',usuarioSchemma)
    /*try{
        await Usuario.createCollection()
        console.log('coleccion creada')
    }catch(e){console.log(e)} */
export default Usuario