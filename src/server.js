const http = require('http');
const { URL } = require('url');

const routes = require('../routes');

module.exports = http.createServer((request, response) => {
  const url = new URL(request.url);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === url.pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(url.searchParams);
    route.hendle(request, response);
  } else {
    response.writeHead(404, { 'Cotent-Type': 'text/html' });
    response.end(`<h1>Not found ${request.method} ${url.pathname}</h1>`);
  }
});
