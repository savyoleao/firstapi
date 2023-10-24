//Controller: armazena e controla a regra de negócios
//CRUD: Create Read Update Delete (operações pra manipulação de dados)

const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc'){
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },
  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));//procurar em users o id p aparecer tudo;

    if(!user){
      return response.send(400, {error: 'user not found'} );
    }


    response.send(200, user);
  },

  createUser(request, response) {
    response.send(200, {ok: true});
  },
};