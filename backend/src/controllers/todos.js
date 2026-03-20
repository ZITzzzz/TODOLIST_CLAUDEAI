import { Todo } from '../models/Todo.js';

export async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ data: todos, error: null, message: 'OK' });
  } catch (err) {
    next(err);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json({ data: todo, error: null, message: 'Todo created' });
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      const err = new Error('Todo not found');
      err.status = 404;
      return next(err);
    }
    res.json({ data: todo, error: null, message: 'Todo updated' });
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      const err = new Error('Todo not found');
      err.status = 404;
      return next(err);
    }
    res.json({ data: null, error: null, message: 'Todo deleted' });
  } catch (err) {
    next(err);
  }
}
