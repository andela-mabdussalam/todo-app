import { UserController, Todos } from '../controllers';
import { authenticate, inputValidator, verifyOwner } from '../middlewares';

export default (app) => {
  app.post('/users', inputValidator, UserController.createUser);
  app.post('/users/login', UserController.login);
  app.put('/users/:id', authenticate, verifyOwner, UserController.updateUser);
  // app.post('/todos', authenticate, Todos.create);
  // app.get('/todos/:id', authenticate, Todos.getUserTodos);
  // app.delete('/todos/:id', authenticate, Todos.deleteUserTodo);
  // app.put('/todos/:id', authenticate, Todos.updateTodo);
};
