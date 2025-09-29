import { Context } from 'koa';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto,} from './user-types';
import { toUserResponse } from './user-mappers';

export class UserController {
  constructor(private userService: UserService) {}

  /**
   * POST /users - Créer un utilisateur
   */
  async create(ctx: Context): Promise<void> {
    const data: CreateUserDto = ctx.request.body;


    if (!data.email || !data.firstName || !data.lastName || !data.password) {
      ctx.throw(400, 'Tous les champs sont requis');
    }

    try {
      const user = await this.userService.create(data);
      ctx.status = 201;
      ctx.body = {
        message: 'Utilisateur créé avec succès',
        data: toUserResponse(user),
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('existe déjà')) {
        ctx.throw(409, error.message);
      }
      throw error;
    }
  }

  /**
   * GET /users/:id - Récupérer un utilisateur
   */
  async getById(ctx: Context): Promise<void> {
    const { id } = ctx.params;

    const user = await this.userService.findById(id);

    if (!user) {
      ctx.throw(404, 'Utilisateur non trouvé');
    }

    ctx.body = {
      data: toUserResponse(user),
    };
  }

  /**
   * GET /users - Récupérer tous les utilisateurs
   */
  async getAll(ctx: Context): Promise<void> {
    const users = await this.userService.findAll();

    ctx.body = {
      data: users.map(toUserResponse),
      total: users.length,
    };
  }

  /**
   * PUT /users/:id - Mettre à jour un utilisateur
   */
  async update(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    const data: UpdateUserDto = ctx.request.body;

    // Vérifier qu'au moins un champ est fourni
    if (Object.keys(data).length === 0) {
      ctx.throw(400, 'Aucune donnée à mettre à jour');
    }

    try {
      const user = await this.userService.update(id, data);
      ctx.body = {
        message: 'Utilisateur mis à jour avec succès',
        data: toUserResponse(user),
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
   * DELETE /users/:id - Supprimer un utilisateur
   */
  async delete(ctx: Context): Promise<void> {
    const { id } = ctx.params;

    try {
      await this.userService.delete(id);
      ctx.status = 204; // No Content
    } catch (error) {
      if (error instanceof Error && error.message.includes('non trouvé')) {
        ctx.throw(404, error.message);
      }
      throw error;
    }
  }
}
