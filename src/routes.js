//rotas do app
const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers,//armazena a função para executar depois
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUserById,//armazena a função para executar depois
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.createUser,//armazena a função para executar depois
  },
];