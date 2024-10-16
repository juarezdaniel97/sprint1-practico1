import http from 'http';
import url from 'url';
import fs from 'fs';


const host = '127.0.0.1';
const port = 3000; 

const server = http.createServer((request, response)=>{
    const url_parse = url.parse(request.url, true);
    const name_url = url_parse.pathname; 
    const method_url = request.method;

    if (name_url === "/" && method_url === "GET") {
        response.statusCode = 200; 
        response.setHeader('Content-Type', 'text/plain');
        response.end('Bienvenido a la Página de Inicio.');

    }else if (name_url == "/sobre-nosotros" && method_url === "GET") {
        fs.readFile('sobre-nosotros.json','utf-8', (err, content)=>{
            if (err) {
                response.statusCode = 550;
                response.end('No se encontro el archivo.');
                throw err
            }
            response.statusCode = 200; 
            response.setHeader('Content-text', 'application/json');
            response.end(content);

            console.log('El archivo leido es:')
            console.log(content)
        });

    }else if(name_url === "/data" && method_url === "POST"){

        let body = ""; 
        
        request.on('data', (chunk)=>{
            body += chunk.toString(); 
        }); 

        request.on('end', ()=>{
        
            fs.appendFile('sobre-nosotros.json', body, (err)=>{
            
                if (err) {
                    response.statusCode = 403;
                    response.setHeader('Content-Type', 'text/plain'); 
                    response.end('No se pudo guardar los datos en el archivo'); 
                    throw err;
    
                } 
            });

            response.statusCode = 200; 
            response.setHeader('Content-Type', 'application/json'); 
            response.end(`Datos recidos: ${body}`);
        }); 

    }else{
        response.statusCode = 404; 
        response.end('No se encontro la página.')
    }
}) 

server.listen(port, host, ()=>{
    console.log(`El servidor se encuentra en: http://${host}:${port}`);
})