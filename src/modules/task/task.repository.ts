import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './task-types';
import prisma from '../../../prisma/client';

export class TaskRepository {
  async create(data: CreateTaskDto): Promise<Task> {
    return prisma.task.create({ data });
  }

  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async findAll(): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.task.count({ where: { id } });
    return count > 0;
  }
}
