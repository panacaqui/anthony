const { async } = require("jshint/src/prod-params");

module.exports = {
  sort: (list, column = "id", order = "asc") => {
    return list.sort((a, b) => {
      if (a[column] && b[column]) {
        if (order === "asc") {
          return a[column] > b[column] ? 1 : -1;
        } else {
          return a[column] < b[column] ? 1 : -1;
        }
      } else {
        return 1;
      }
    });
  },
  bodyParse: (request, callback) => {
    let body = '';

    request.on('data', (chunck) => {
      body += chunck;
    }).on('end', () => {
      body = JSON.parse(body);
      request.body = body;
      callback();
    });
  }
};
