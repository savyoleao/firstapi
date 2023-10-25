const http = require('http');
const { URL } = require('url'); //desestruturou e puxou a classe URL

const bodyParser = require('./helpers/bodyParser')
const routes = require('./routes');

const server = http.createServer(function (request, response) {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`) //criou a instância da classe URL
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;
  
  const splitEndpoint = pathname.split('/').filter(Boolean);//dividiu a string e transformou em uma array pra separar em posições //retirar o valor vazio;

  if(splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;//localizar a primeira posição da array p conseguir usar na url
    id = splitEndpoint[1]; //localizar o id
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method //chama a endpoint e o metodo
  ));

  if (route){
    request.query = Object.fromEntries(parsedUrl.searchParams); //recebe os queryparams //transforma o parsedurl em objeto do javascript
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(body));
    }

    if(['POST', 'PUT', 'PATCH'].includes(request.method)){
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response); //executa a função
    }
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
  response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }

});//criando o servidor

server.listen(3000, () => console.log('Server started at http://localhost:3000'));//botando o servidor no ar


/* if(request.url === '/users' && request.method === 'GET') {
    UserController.listUsers(request, response);
  }else {
    response.writeHead(404, {'Content-Type': 'text/html'});
  response.end(`Cannot ${request.method} ${request.url}`);//caso busque uma rota que nao está no servidor
  }*/