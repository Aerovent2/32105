argumentos que recive main.js : 
    1-numero de puerto sin flag como primer argumento de no especificar utiliza 8081
    2-modo de fucionamiento cluster si es especificado de lo contrario se ejecuta en modo fork
    3- el puerto 8083 esta reservado para el modo cluster de random (genera un cluster + fork de cada proceso de generar random)
    
    ej: node main 8082  --modo=cluster 

para usar con pm2 
    -ubicarse en la carpeta raiz de la entrega "aca"
    -ejecutar por consola 'pm2 start main.js --name=1 -i 3 -- [args para el main]'

para usar con nginx
    nginx levanta en el puerto 8080
    balancea automaticamente a los puerto 8081 y 8082 
    el puerto 8082 recive una carga de 3
    si recive una peticion a /api/random redirige al puerto 8083(ver punto 3 )
    no sirve contenido estatico 