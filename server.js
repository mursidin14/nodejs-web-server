const http = require('http');

const requesListener = (request, response) => {

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'Nodejs');

    response.statusCode = 200;
    
    const { method, url } = request;

    if(url === '/'){
        if(method === 'GET'){
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'ini adalah homepage'
            }));
        }else{
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    }else if(url === '/about'){
        if(method === 'GET'){
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about'
            }));
        }else if(method === 'POST'){
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`
                }));
            });
            // response.end(`<h1>Halo, ${method}! Ini adalah halaman about</h1>`);
        }else{
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`
            }));
        }
    }else{
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan'
        }))
    }

}

const server = http.createServer(requesListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});