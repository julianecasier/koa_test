import { Task } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './task-types';
import { NotFoundError, ValidationError, ValidationErrorDetails } from '@utils/types/api-errors';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async create(data: CreateTaskDto): Promise<Task> {
    const errors: ValidationErrorDetails = {};

    if (!data.title || data.title.trim() === '') {
      errors.title = 'Le titre de la tâche est requis';
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Erreur de validation', errors);
    }

    return this.taskRepository.create(data);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError('Tâche');
    }
    return task;
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError('Tâche');
    }

    if (data.title !== undefined && data.title.trim() === '') {
      throw new ValidationError('Le titre de la tâche ne peut pas être vide', {
        title: 'Le titre ne peut pas être vide',
      });
    }

    return this.taskRepository.update(id, data);
  }

  async delete(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError('Tâche');
    }

    return this.taskRepository.delete(id);
  }

  async toggleComplete(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tâche non trouvée');
    }

    return this.taskRepository.update(id, { completed: !task.completed });
  }
}
