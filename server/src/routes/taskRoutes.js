import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createManyTasks,
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

const taskValidation = [
  body('titulo').trim().isLength({ min: 1, max: 180 }).withMessage('Titulo invalido.'),
  body('descricao').optional().isString().isLength({ max: 2000 }),
  body('data').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Data invalida.'),
  body('hora').optional({ values: 'falsy' }).matches(/^\d{2}:\d{2}$/).withMessage('Horario invalido.'),
  body('tipo')
    .optional()
    .isIn(['prova', 'trabalho', 'estudo', 'aula', 'reuniao', 'pessoal', 'outro']),
  body('prioridade').optional().isIn(['alta', 'media', 'baixa']),
  body('status').optional().isIn(['pendente', 'concluida']),
  body('disciplina').optional().isString().isLength({ max: 120 }),
  body('recorrencia').optional().isIn(['nenhuma', 'semanal']),
  body('recorrenciaSemanas').optional({ values: 'null' }).isInt({ min: 2, max: 16 }),
  body('recurrenceGroupId').optional({ values: 'null' }).isString(),
];

router.use(requireAuth);

router.get('/', asyncHandler(listTasks));
router.post('/', taskValidation, validateRequest, asyncHandler(createTask));
router.post(
  '/import',
  body('tasks').isArray({ min: 1 }).withMessage('Envie ao menos uma tarefa.'),
  body('tasks.*.titulo').trim().isLength({ min: 1, max: 180 }),
  body('tasks.*.data').matches(/^\d{4}-\d{2}-\d{2}$/),
  validateRequest,
  asyncHandler(createManyTasks),
);
router.put(
  '/:id',
  param('id').isMongoId().withMessage('Id invalido.'),
  taskValidation,
  validateRequest,
  asyncHandler(updateTask),
);
router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Id invalido.'),
  validateRequest,
  asyncHandler(deleteTask),
);

export default router;
