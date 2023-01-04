import twilio from "twilio";
import * as dotenv from "dotenv"

dotenv.config()

const accountSID="AC2a3588b32cf95b303774454294f9cf5e"
const authToken=process.env.TWILIO_TOKEN

const params = process.argv
const phoneNumber= params[2] || "+543435409017"
const body= params[3] || "mensaje"



const client = twilio(accountSID,authToken)
try{
    await client.messages.create({
        body,
        from:"+17754061518",
        to:phoneNumber
    })
    console.info(client)
}catch(e){
    console.error(e)
}

// node desafio3 "+543435409017" "hola este es el mensaje"