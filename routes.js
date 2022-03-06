const UserController = require("./controllers/UserController");

module.exports = [
  {
    endpoint: "/users",
    method: "GET",
    hendle: UserController.listUsers
  },
  {
    endpoint: "/users",
    method: "POST",
    hendle: UserController.createUser
  },
  {
    endpoint: "/users/:id",
    method: "GET",
    hendle: UserController.getUser
  },
  {
    endpoint: "/users/:id",
    method: "PUT",
    hendle: UserController.updateUser
  },
  {
    endpoint: "/users/:id",
    method: "DELETE",
    hendle: UserController.deleteUser
  }
];
