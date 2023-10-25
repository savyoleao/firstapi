//Controller: armazena e controla a regra de negócios
//CRUD: Create Read Update Delete (operações pra manipulação de dados)

let users = require('../mocks/users');

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
      const { body } = request;
      const lastUserId = users[users.length - 1].id;
      const newUser  = {
        id: lastUserId + 1,
        name: body.name,
      }

      users.push(newUser)//puxar o array pra memória (guardar ele junto com os outros id)

      response.send(200, newUser);
  },

  updateUser(request, response) {
    let { id } = request.params;
    const { name } = request.body;
    
    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if (!userExists) {
      return response.send(400, {error: 'User not Found'});
    }

    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user, //clonar os dados do usuario
          name,
        };
      }

      return user;
    });

    response.send(200, {id, name});

  },

  deleteUser(request, response) {
    let { id } = request.params
    id = Number(id);

    users = users.filter((user) => user.id !== id);
    response.send(200, {deleted: true});
  }
};