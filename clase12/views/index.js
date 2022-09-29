const mensajes = document.getElementById('mensajes')
const mensaje = document.getElementById('mensajeChat')
const nombre = document.getElementById('nombre')

const render= (data)=>{
    const html = data.map((msj)=>{
        return(`<li class="clearfix">
        <div class="message-data">
            <strong class="message-data-time"> ${msj.autor}</strong>
        </div>
        <div class="message my-message">${msj.msj}</div>
     </li>`)
    }).join(" ")
    mensajes.innerHTML =html
}

const enviarMensaje= (event)=>{
    socket.emit('new-msg',{autor:nombre.value, msj:mensaje.value})
    mensaje.value = ''
    return false
}

const socket = io.connect()

socket.on('mensajes', (data)=>{
    
    render(data)
})