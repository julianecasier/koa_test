import { Context } from 'koa';
import { TaskService } from './task.service';

import { SuccessResponse } from '@utils/types/api-response';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './task-types';

export class TaskController {
  constructor(private taskService: TaskService) {}

  create = async (ctx: Context): Promise<void> => {
    const body = ctx.request.body as CreateTaskDto;
    const task = await this.taskService.create(body);

    ctx.status = 201;
    ctx.body = {
      success: true,
      data: task,
    } satisfies SuccessResponse<Task>;
  };

  getById = async (ctx: Context): Promise<void> => {
    const task = await this.taskService.findById(ctx.params.id);

    ctx.body = {
      success: true,
      data: task,
    } satisfies SuccessResponse<Task>;
  };

  getAll = async (ctx: Context): Promise<void> => {
    const tasks = await this.taskService.findAll();

    ctx.body = {
      success: true,
      data: tasks,
    } satisfies SuccessResponse<Task[]>;
  };

  update = async (ctx: Context): Promise<void> => {
    const body = ctx.request.body as Partial<CreateTaskDto>;
    const task = await this.taskService.update(ctx.params.id, body);

    ctx.body = {
      success: true,
      data: task,
    } satisfies SuccessResponse<Task>;
  };

  delete = async (ctx: Context): Promise<void> => {
    const task = await this.taskService.delete(ctx.params.id);

    ctx.body = {
      success: true,
      data: task,
    } satisfies SuccessResponse<Task>;
  };
}
