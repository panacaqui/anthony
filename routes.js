const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    hendle: UserController.listUsers
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    hendle: UserController.getUser
  }
];
