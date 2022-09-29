const fs =require('fs')

fs.writeFileSync('./usuario.json', JSON.stringify({usuario:"maria"}))

const data = fs.readFileSync('./usuario.json', 'utf-8')


fs.appendFileSync('./usuario.json','hola soy nuevo')

console.log(data)

try{
    fs.unlinkSync('./usuario.json')
    console.log('se elimino el archivo')
}catch(err){
    console.log('errror')
    console.log(err)
}

