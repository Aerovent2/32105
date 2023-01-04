import {createTransport} from 'nodemailer'

async function run(){
    const transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'nicklaus.yundt90@ethereal.email',
            pass: 'Y82whUPPqzgjmg6AaP'
        }
    });
    
    const opts ={
        from:'nicklaus.yundt90@ethereal.email',
        to:"alysa.powlowski@ethereal.email",
        subject:"email de prueba desde node",
        html:`<h1>Acá iria el mensaje</h1>`
    }
    
    try{
       const info= await transporter.sendMail(opts)
       console.log(info)
    }catch(e){
        console.error(e)
    }
}
run()