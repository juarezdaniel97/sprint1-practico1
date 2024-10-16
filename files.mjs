import fs from 'fs';


const data = 'Este es un texto de ejemplo. \n';


fs.writeFile('ejemplo.txt', data, (err)=>{
    if (err) {
        throw err;
    }
    console.log('Archivo creado exitosamente!\n');
});

fs.readFile('ejemplo.txt', 'utf-8', (err, content)=>{
    if (err) {
        throw err; 
    }

    console.log('El contenido del archivo leído es: \n');
    console.log(content);
});

