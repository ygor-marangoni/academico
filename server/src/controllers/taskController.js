import { Task } from '../models/Task.js';

function serializeTask(task) {
  return {
    id: task._id.toString(),
    titulo: task.titulo,
    descricao: task.descricao,
    data: task.data,
    hora: task.hora,
    tipo: task.tipo,
    prioridade: task.prioridade,
    status: task.status,
    disciplina: task.disciplina,
    recorrencia: task.recorrencia,
    recorrenciaSemanas: task.recorrenciaSemanas,
    recurrenceGroupId: task.recurrenceGroupId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export async function listTasks(req, res) {
  const tasks = await Task.find({ userId: req.user.id }).sort({
    data: 1,
    hora: 1,
    createdAt: 1,
  });

  return res.json({ tasks: tasks.map(serializeTask) });
}

export async function createTask(req, res) {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id,
  });

  return res.status(201).json({ task: serializeTask(task) });
}

export async function createManyTasks(req, res) {
  const items = Array.isArray(req.body?.tasks) ? req.body.tasks : [];
  if (!items.length) {
    return res.status(400).json({ message: 'Nenhuma tarefa enviada para importacao.' });
  }

  const created = await Task.insertMany(
    items.map((item) => ({
      ...item,
      userId: req.user.id,
    })),
  );

  return res.status(201).json({ tasks: created.map(serializeTask) });
}

export async function updateTask(req, res) {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { ...req.body },
    { new: true, runValidators: true },
  );

  if (!task) {
    return res.status(404).json({ message: 'Tarefa nao encontrada.' });
  }

  return res.json({ task: serializeTask(task) });
}

export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Tarefa nao encontrada.' });
  }

  return res.status(204).send();
}
