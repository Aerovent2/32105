const div=document.querySelector('div')
const boton = document.querySelector('button')
const input =document.querySelector('#inputMensaje')

const socket = io()

const render= (data)=>{
    const html = data.map((mensaje)=>{
        return(`<div>
                    <strong> ${mensaje.socketId}</strong>:
                    <em> ${mensaje.mensaje}</em> </div>`)
    }).join(" ")
    div.innerHTML =html
}

socket.on('mensajes',(data)=>{
    render(data)
})

boton.addEventListener("click",()=>{
    const mensaje = input.value
    input.value=""
    socket.emit('mensaje',mensaje)
})