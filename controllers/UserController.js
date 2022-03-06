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
  },
  getUser(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, { error: 'User not find' }, 'json');
    } else {
      response.send(200, user, 'json');
    }
  }
};
