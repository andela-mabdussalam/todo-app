import { UserController, TodoController } from '../controllers';
import { authenticate, inputValidator, verifyOwner } from '../middlewares';

export default (app) => {
  app.post('/users', inputValidator, UserController.createUser);
  app.post('/users/login', UserController.login);
  app.put('/users/:id', authenticate, verifyOwner, UserController.updateUser);
  app.post('/todos', authenticate, TodoController.create);
  app.get('/todos/:id', authenticate, TodoController.getUserTodos);
  app.delete('/todos/:id', authenticate, TodoController.deleteUserTodo);
  app.put('/todos/:id', authenticate, TodoController.updateTodo);
};
