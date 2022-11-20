import mongoose from "mongoose";
export function DBConnect(cb){
    mongoose.connect("mongodb+srv://Aerovent2:PmslOif8zFcPUMEO@cluster0.ukiygmp.mongodb.net/users"),
    {useNewUrlParser:true},(err)=>{if(err)cb(err)}
}

export const Users = mongoose.model('users',{
    username:String,
    password:String,
    email:String

})