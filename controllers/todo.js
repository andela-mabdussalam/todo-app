import models from '../models';
const { Todo, User } = models;

export default {
  async getAllTodos(req, res) {
    try {
      const todos = await Todo.findAndCountAll();
      if (!todos.count) {
        return res.json({
          message: `No Todo found now`
        });
      }
      return res.json({
        todos: todos.rows,
        noOfTodos: todos.count
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  async createTodo(req, res) {
    const userId = req.body.userId || req.params.userId ;
    const { title, description } = req.body;
    try {
      const userExists = await User.findOne({ where: { id: userId}});
      if(!userExists) {
        return res.status(404).json({ message: "User does not exist" });
      }
      const todo = await Todo.findOrCreate({
        where: { title },
        defaults: {
          userId,
          title,
          description
      } });
      if(!todo[1]) {
        return res.status(409).json({ message: "Todo already exists" });
      }
      return res.status(201).json({ message: "Todo successfully added" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
