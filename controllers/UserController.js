const { sort } = require('../helpers/functions');
const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { column, order } = request.query;

    if (column || order) {
      sort(users, column, order);
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  }
};
