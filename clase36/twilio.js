import twilio from "twilio";
import * as dotenv from "dotenv"

dotenv.config()

const accountSID="AC2a3588b32cf95b303774454294f9cf5e"
const authToken=process.env.TWILIO_TOKEN

const client = twilio(accountSID,authToken)
try{
    await client.messages.create({
        body:"Hola  desde twilio con node",
        from:"whatsapp:+14155238886",
        to:"whatsapp:+5493435409017",
        mediaUrl:["https://th.bing.com/th/id/R.1d93fa3ae9fa17b67d9bbce62b55fd14?rik=LoX9P%2fuQIWseNQ&pid=ImgRaw&r=0"]
    })
    console.info(client)
}catch(e){
    console.error(e)
}