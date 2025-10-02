import { Task } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './task-types';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async create(data: CreateTaskDto): Promise<Task> {
    // Validation basique
    if (!data.title || data.title.trim() === '') {
      throw new Error('Le titre de la tâche est requis');
    }

    return this.taskRepository.create(data);
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    // Vérifier que la tâche existe
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tâche non trouvée');
    }

    // Validation si le titre est modifié
    if (data.title !== undefined && data.title.trim() === '') {
      throw new Error('Le titre de la tâche ne peut pas être vide');
    }

    return this.taskRepository.update(id, data);
  }

  async delete(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Tâche non trouvée');
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
