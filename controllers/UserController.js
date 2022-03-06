let users = require("../mocks/users");

function getUserById(id) {
  return users.find((user) => (user.id === id));
}

module.exports = {
  listUsers(request, response) {
    const { column, order } = request.query;

    if (column || order) {
      sort(users, column, order);
    }

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  },

  createUser(request, response) {
    if (!request.body.name || !request.body.lastName) {
      return response.send(500, "Bad request", "html");
    }

    const user = {
      id: users[users.length - 1].id + 1,
      name: request.body.name,
      lastName: request.body.lastName,
      active: true,
    };

    users.push(user);

    response.send(200, user, "json");
  },

  getUser(request, response) {
    const id = Number(request.params.id);

    const user = getUserById(id);

    if (!user) {
      return response.send(400, { error: "User not find" }, "json");
    }

    response.send(200, user, "json");
  },

  updateUser(request, response) {
    const id = Number(request.params.id);
    const { name, lastName } = request.body;

    if (!getUserById(id)) {
      return response.send(400, { error: "User not find" }, "json");
    }

    users = users.map((user) => { return user.id === id ? { ...user, name, lastName } : user; });

    return response.send(200, getUserById(id), "json");
  },

  deleteUser(request, response) {
    const id = Number(request.params.id);

    if (!getUserById(id)) {
      return response.send(400, { error: "User not find" }, "json");
    }

    users = users.filter((user) => (user.id !== id));

    return response.send(200, "OK", "html");
  }
};
