import { Context } from 'koa';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task-types';
import { toTaskResponse } from './task-mappers';

export class TaskController {
  constructor(private TaskService: TaskService) {}

  /**
   * POST /Tasks - Créer un utilisateur
   */
  async create(ctx: Context): Promise<void> {
    const data: CreateTaskDto = ctx.request.body;

    if (!data.email || !data.firstName || !data.lastName || !data.password) {
      ctx.throw(400, 'Tous les champs sont requis');
    }

    try {
      const Task = await this.TaskService.create(data);
      ctx.status = 201;
      ctx.body = {
        message: 'Utilisateur créé avec succès',
        data: toTaskResponse(Task),
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('existe déjà')) {
        ctx.throw(409, error.message);
      }
      throw error;
    }
  }

  /**
   * GET /Tasks/:id - Récupérer un utilisateur
   */
  async getById(ctx: Context): Promise<void> {
    const { id } = ctx.params;

    const Task = await this.TaskService.findById(id);

    if (!Task) {
      ctx.throw(404, 'Utilisateur non trouvé');
    }

    ctx.body = {
      data: toTaskResponse(Task),
    };
  }

  /**
   * GET /Tasks - Récupérer tous les utilisateurs
   */
  async getAll(ctx: Context): Promise<void> {
    const Tasks = await this.TaskService.findAll();

    ctx.body = {
      data: Tasks.map(toTaskResponse),
      total: Tasks.length,
    };
  }

  /**
   * PUT /Tasks/:id - Mettre à jour un utilisateur
   */
  async update(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    const data: UpdateTaskDto = ctx.request.body;

    // Vérifier qu'au moins un champ est fourni
    if (Object.keys(data).length === 0) {
      ctx.throw(400, 'Aucune donnée à mettre à jour');
    }

    try {
      const Task = await this.TaskService.update(id, data);
      ctx.body = {
        message: 'Utilisateur mis à jour avec succès',
        data: toTaskResponse(Task),
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('non trouvé')) {
          ctx.throw(404, error.message);
        }
        if (error.message.includes('existe déjà')) {
          ctx.throw(409, error.message);
        }
      }
      throw error;
    }
  }

  /**
   * DELETE /Tasks/:id - Supprimer un utilisateur
   */
  async delete(ctx: Context): Promise<void> {
    const { id } = ctx.params;

    try {
      await this.TaskService.delete(id);
      ctx.status = 204; // No Content
    } catch (error) {
      if (error instanceof Error && error.message.includes('non trouvé')) {
        ctx.throw(404, error.message);
      }
      throw error;
    }
  }
}
