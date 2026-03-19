import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    descricao: {
      type: String,
      default: '',
      maxlength: 2000,
    },
    data: {
      type: String,
      required: true,
    },
    hora: {
      type: String,
      default: '',
    },
    tipo: {
      type: String,
      enum: ['prova', 'trabalho', 'estudo', 'aula', 'reuniao', 'pessoal', 'outro'],
      default: 'outro',
    },
    prioridade: {
      type: String,
      enum: ['alta', 'media', 'baixa'],
      default: 'media',
    },
    status: {
      type: String,
      enum: ['pendente', 'concluida'],
      default: 'pendente',
    },
    disciplina: {
      type: String,
      default: '',
      maxlength: 120,
    },
    recorrencia: {
      type: String,
      enum: ['nenhuma', 'semanal'],
      default: 'nenhuma',
    },
    recorrenciaSemanas: {
      type: Number,
      default: null,
      min: 2,
      max: 16,
    },
    recurrenceGroupId: {
      type: String,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ userId: 1, data: 1 });
taskSchema.index({ userId: 1, status: 1 });

export const Task = mongoose.model('Task', taskSchema);
