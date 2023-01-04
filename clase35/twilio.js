import twilio from "twilio";
import * as dotenv from "dotenv"

dotenv.config()

const accountSID="AC2a3588b32cf95b303774454294f9cf5e"
const authToken=process.env.TWILIO_TOKEN

const client = twilio(accountSID,authToken)
try{
    await client.messages.create({
        body:"Hola  desde twilio con node",
        from:"+17754061518",
        to:"+543435409017"
    })
    console.info(client)
}catch(e){
    console.error(e)
}