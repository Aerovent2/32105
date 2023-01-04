import {createTransport} from 'nodemailer'

function run({subject,html,email}){
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jimmie.donnelly@ethereal.email',
            pass: 'QZ7TXUX9nrP1DZe7FB'
        }
    })
    
    const opts ={
        from:'jimmie.donnelly@ethereal.email',
        to:email,
        subject,
        html
    }
    
    try{
       return  transporter.sendMail(opts)
       
    }catch(e){
        throw Error(e)
    }
}
const params = process.argv
const subject= params[2] || "Titulo"
const html= params[3] || "html"
const email = "alysa.powlowski@ethereal.email"

const info = await run({subject,html,email})
console.log(info)