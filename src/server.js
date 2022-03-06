const http = require('http');
const { URL } = require('url');

const routes = require('../routes');

module.exports = http.createServer((request, response) => {
  const url = new URL(`https://dev${request.url}`);

  let pathName = url.pathname;
  let params = {};

  const splitedPathName = pathName.split('/').filter(Boolean);
  if (splitedPathName.length > 1) {
    pathName = `/${splitedPathName[0]}/:id`;
    params = { id: splitedPathName[1] };
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathName && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(url.searchParams);
    request.params = params;
    route.hendle(request, response);
  } else {
    response.writeHead(404, { 'Cotent-Type': 'text/html' });
    response.end(`<h1>Not found ${request.method} ${url.pathname}</h1>`);
  }
});
