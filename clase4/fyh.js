
const fs= require('fs')
const filePath= './fyh.txt'
try{
    const hora = new Date()
    fs.writeFileSync(filePath, JSON.stringify(hora))
}catch(err){
    console.log(`no se pudo crear el archivo ${filePath}:  ${err}`)
}

try{
    const data =fs.readFileSync(filePath, 'utf-8')
    console.log(data)
}catch(err){
    console.log(`se produjo un error al leer el archivo ${filePath}:`)
}