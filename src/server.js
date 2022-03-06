const http = require('http');
const { URL } = require('url');

const routes = require('../routes');

function getRoute(request) {
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

  return { route, params, query: Object.fromEntries(url.searchParams) };
}

module.exports = http.createServer((request, response) => {
  const { route, params, query } = getRoute(request);

  response.send = (statusCode, body, type) => {
    response.writeHead(statusCode, { 'Content-Type': type === 'json' ? 'application/json' : 'text/html' });
    response.end(type === 'json' ? JSON.stringify(body) : body);
  };

  if (route) {
    request.query = query;
    request.params = params;
    route.hendle(request, response);
  } else {
    response.send(404, `<h1>Not found</h1>`, 'html');
  }
});
