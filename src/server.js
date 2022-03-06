const http = require("http");
const { URL } = require("url");

const routes = require("../routes");
const { bodyParse } = require("../helpers/functions");

function getRoute(request) {
  const url = new URL(`https://dev${request.url}`);

  let pathName = url.pathname;
  let params = {};

  const splitedPathName = pathName.split("/").filter(Boolean);
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
    if (type === "json") {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(JSON.stringify(body));
    } else {
      response.writeHead(statusCode, { "Content-Type": "text/html" });
      response.end(body);
    }
  };

  if (route) {
    request.query = query;
    request.params = params;

    if (['POST', 'PUT'].includes(request.method)) {
      bodyParse(request, () => route.hendle(request, response));
    } else {
      route.hendle(request, response);
    }
  } else {
    response.send(404, `<h1>Not found</h1>`, "html");
  }
});
