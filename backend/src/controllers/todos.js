import { Todo } from '../models/Todo.js';

export async function getTodos(req, res, next) {
  try {
    const { q } = req.query;
    const filter = q
      ? { $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ] }
      : {};
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json({ data: todos, error: null, message: 'OK' });
  } catch (err) {
    next(err);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { title, description, priority, dueDate } = req.body;
    const todo = await Todo.create({ title, description, priority, dueDate });
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

export async function uploadTodoImage(req, res, next) {
  try {
    if (!req.file) {
      const err = new Error('No file uploaded');
      err.status = 400;
      return next(err);
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { imageUrl },
      { new: true }
    );
    if (!todo) {
      const err = new Error('Todo not found');
      err.status = 404;
      return next(err);
    }
    res.json({ data: todo, error: null, message: 'Image uploaded' });
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
