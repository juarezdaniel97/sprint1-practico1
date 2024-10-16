
import http from "http"


const host = '127.0.0.1';
const port = 5000;

const server = http.createServer((request, response)=>{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Hola Mundo.. ");
})

server.listen(port, host, ()=>{
    console.log(`El servidor está corriendo en http://${host}:${port}`)
})