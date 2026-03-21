import { Router } from 'express';
import { getTodos, createTodo, updateTodo, uploadTodoImage, deleteTodo } from '../controllers/todos.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.patch('/:id/image', upload.single('image'), uploadTodoImage);
router.delete('/:id', deleteTodo);

export default router;
