var http = require('http');

http.createServer((request, response) => {
  
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  
  response.on('error', function(err) {
    console.error(err);
  });
  
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
    console.log(request)
    response.write("request.body");
    response.write("header <br>");
    response.end("sudah");
  } else {
    response.statusCode = 404;
    response.end();
  }
  
}).listen(8080);