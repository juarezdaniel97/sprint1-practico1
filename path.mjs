/*
    Diplomatura - Módulo 3 
    EJEMPLO 2: CREAR UN SERVIDOR Y MANEJAR RUTAS
*/

import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 3000; 

const server = http.createServer((req, res)=>{

    const parseUrl = url.parse(req.url, true)
    const namePath = parseUrl.pathname
    const method = req.method

    if (namePath === "/" && method === "GET") {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Página de Inicio\n');

    }else if(namePath === "/about" && method === "GET"){

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Sobre nosotros!');

    }else if (namePath === "/data" && method === "POST") {
        let body = '';

        req.on('data', chunk =>{
            body += chunk.toString();
        });

        req.on('end', ()=>{
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.end(`Datos Recibidos: ${body}\n`);
        })

    }else{
        res.statusCode = 404; 
        res.end('Página no encontrada');
    }

})

server.listen(port, hostname, ()=>{
    console.log(`El servidor está escuchando en: http://${hostname}:${port}`)
})