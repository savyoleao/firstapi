//realizar os eventlistener de post/put

function bodyParser(request, callback) {
  let body = '';

  request.on('data', (chunk) =>{
    body += chunk;//recebe as informações e concatena;
  });

  request.on('end', () => {
    body = JSON.parse(body);//transformando string em json
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;